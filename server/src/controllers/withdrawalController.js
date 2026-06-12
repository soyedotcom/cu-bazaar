import { prisma } from "../config/database.js";
import { korapayPublic } from "../config/korapay.js";
import { korapaySecret } from "../config/korapay.js";

const baseUrl = process.env.KORAPAY_BASE_URL;

const getBanks = async (req, res) => {
  try {
    const response = await korapayPublic.get(
      `${baseUrl}/misc/banks?countryCode=NG`,
    );
    return res.status(200).json({ status: true, data: response.data.data });
  } catch (error) {
    // console.error(error);
    console.error("error:");
    console.error(error.response?.data);
    console.error(error.response?.status);
    console.error(error.message);
    return res.status(500).json({ error: "Failed to fetch banks" });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { bank, account } = req.body;
    const response = await korapayPublic.post(`${baseUrl}/misc/banks/resolve`, {
      bank,
      account,
      currency: "NGN",
    });
    return res.status(200).json({ status: true, data: response.data.data });
  } catch (error) {
    //console.error(error);
    console.error("error:");
    console.error(error.response?.data);
    console.error(error.response?.status);
    console.error(error.message);
    return res.status(400).json({
      error: error.response?.data.message || "Account verification failed",
    });
  }
};

const requestWithdrawal = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { amount, bankName, bankSlug, bankCode, accountNumber, accountName } =
      req.body;

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: sellerId },
    });

    if (!seller) return res.status(404).json({ error: "Seller not found" });

    if (Number(seller.availableBalance) < amount)
      return res.status(400).json({ error: "Insufficient available balance" });

    // Deduct immediately to prevent double withdrawal
    await prisma.sellerProfile.update({
      where: { userId: sellerId },
      data: { availableBalance: { decrement: amount } },
    });

    const reference = `WD-${sellerId.slice(0, 8)}-${Date.now()}`;

    const withdrawal = await prisma.withdrawal.create({
      data: {
        sellerId,
        amount,
        bankName,
        bankSlug,
        bankCode,
        accountNumber,
        accountName,
        reference,
        status: "PENDING",
      },
    });

    // Initiate payout via KoraPay
    try {
      await korapaySecret.post(`${baseUrl}/transactions/disburse`, {
        reference,
        destination: {
          type: "bank_account",
          amount: Number(amount),
          currency: "NGN",
          narration: `Withdrawal to ${bankName} - ${accountNumber}`,
          customer: {
            name: accountName,
            email: req.user.email,
          },
          bank_account: {
            bank: bankCode,
            account: accountNumber,
          },
        },
      });

      await prisma.withdrawal.update({
        where: { id: withdrawal.id },
        data: { status: "PROCESSING" },
      });

      await prisma.walletTransaction.create({
        data: {
          sellerId,
          amount,
          type: "WITHDRAWAL",
          description: `Withdrawal to ${bankName} ${accountNumber}`,
          reference,
        },
      });
    } catch (payoutError) {
      // Refund balance if payout initiation fails
      await prisma.sellerProfile.update({
        where: { userId: sellerId },
        data: { availableBalance: { increment: amount } },
      });
      await prisma.withdrawal.update({
        where: { id: withdrawal.id },
        data: { status: "FAILED" },
      });
      return res.status(500).json({ error: "Payout failed, balance restored" });
    }

    return res.status(200).json({ status: "success", data: { withdrawal } });
  } catch (error) {
    //console.error(error);
    console.error("error:");
    console.error(error.response?.data);
    console.error(error.response?.status);
    console.error(error.message);
    return res.status(500).json({ error: "Failed to process withdrawal" });
  }
};

// POST /withdrawals/webhook  ← register this as your KoraPay webhook URL
const handleWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;

    // Always acknowledge immediately so KoraPay doesn't retry
    res.status(200).json({ received: true });

    if (!data?.reference) return;

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { reference: data.reference },
    });

    if (!withdrawal) return;

    if (event === "charge.success" || event === "transfer.success") {
      await prisma.withdrawal.update({
        where: { reference: data.reference },
        data: { status: "SUCCESS" },
      });
    } else if (event === "transfer.failed" || event === "charge.failed") {
      // Refund seller on confirmed failure
      await prisma.withdrawal.update({
        where: { reference: data.reference },
        data: { status: "FAILED" },
      });
      await prisma.sellerProfile.update({
        where: { userId: withdrawal.sellerId },
        data: { availableBalance: { increment: withdrawal.amount } },
      });
    }
  } catch (error) {
    console.error("Webhook error:", error);
  }
};

const getWithdrawals = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const withdrawals = await prisma.withdrawal.findMany({
      where: { sellerId },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ status: "success", data: { withdrawals } });
  } catch (error) {
    //console.error(error);
    console.error("error:");
    console.error(error.response?.data);
    console.error(error.response?.status);
    console.error(error.message);
    return res.status(500).json({ error: "Failed to load withdrawals" });
  }
};

export {
  requestWithdrawal,
  getWithdrawals,
  getBanks,
  verifyAccount,
  handleWebhook,
};
