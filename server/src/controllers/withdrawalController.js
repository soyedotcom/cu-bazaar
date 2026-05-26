import { prisma } from "../config/database.js";
import { korapay } from "../config/korapay.js";

const requestWithdrawal = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { amount, bankName, accountNumber, accountName } = req.body;

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: sellerId },
    });

    if (!seller) return res.status(404).json({ error: "Seller not found" });

    if (Number(seller.availableBalance) < amount)
      return res.status(400).json({ error: "Insufficient available balance" });

    // deduct immediately to prevent double withdrawal
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
        accountNumber,
        accountName,
        reference,
        status: "PENDING",
      },
    });

    // initiate payout via KoraPay
    try {
      await korapay.post("/transactions/disburse", {
        reference,
        destination: {
          type: "bank_account",
          amount,
          currency: "NGN",
          bank_account: { bank: bankName, account: accountNumber },
          customer: { email: req.user.email, name: accountName },
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
      // refund if payout fails
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
    console.log(error);
    return res.status(500).json({ error: "Failed to process withdrawal" });
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
    return res.status(500).json({ error: "Failed to load withdrawals" });
  }
};

export { requestWithdrawal, getWithdrawals };
