import { useEffect, useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Props = {
  availableBalance: number;
  onClose: () => void;
  onSuccess: () => void;
};

type Bank = {
  name: string;
  slug: string;
  code: string;
  country: string;
};

const WithdrawCard = ({ availableBalance, onClose, onSuccess }: Props) => {
  const [amount, setAmount] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankAvailability, setBankAvailability] = useState<
    "available" | "delayed" | "unavailable" | null
  >(null);
  const [verifying, setVerifying] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/seller/withdrawals/banks");
        setBanks(res.data.data);
      } catch {
        setError("Failed to load banks. Please try again.");
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      verifyAccount();
    } else {
      setAccountName("");
      setBankAvailability(null);
    }
  }, [accountNumber, selectedBank]);

  const verifyAccount = async () => {
    if (!selectedBank) return;
    setVerifying(true);
    setAccountName("");
    setError("");
    try {
      const res = await api.post("/seller/withdrawals/verify-account", {
        bank: selectedBank.code,
        account: accountNumber,
      });
      setAccountName(res.data.data.account_name);

      // Check bank availability after verification
      const availRes = await api.post("/seller/withdrawals/bank-availability", {
        bankCode: selectedBank.code,
      });

      const status: string =
        availRes.data.status?.toLowerCase() ?? "unavailable";
      setBankAvailability(status as "available" | "delayed" | "unavailable");
    } catch {
      setError("Could not verify account. Check the number and try again.");
      setAccountName("");
    } finally {
      setVerifying(false);
    }
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bank = banks.find((b) => b.code === e.target.value) ?? null;
    setSelectedBank(bank);
    setAccountName("");
    setBankAvailability(null);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBank || !accountName) return;
    if (bankAvailability === "unavailable") {
      setError("This bank is currently unavailable. Please try again later.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/seller/withdrawals", {
        amount: parseFloat(amount),
        bankName: selectedBank.name,
        bankSlug: selectedBank.slug,
        bankCode: selectedBank.code,
        accountNumber,
        accountName,
      });
      onSuccess();
    } catch (err) {
      setError(
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Withdrawal failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border border-gray-400 rounded-full w-full px-4 py-2 h-12 outline-none";
  const labelClass = "font-bold py-2.5 pl-2 text-left";

  const availabilityBadge = {
    available: (
      <span className="text-xs text-green-600 font-medium pl-2">
        Instant payouts available
      </span>
    ),
    delayed: (
      <span className="text-xs text-yellow-600 font-medium pl-2">
        Payouts may be delayed
      </span>
    ),
    unavailable: (
      <span className="text-xs text-red-500 font-medium pl-2">
        Bank currently unavailable
      </span>
    ),
  };

  return (
    <main
      className="bg-[#d9d9d9af] fixed w-screen h-screen z-10 top-0 left-0 flex justify-center items-center"
      onClick={onClose}
    >
      <section
        className="bg-white relative z-20 rounded-xl p-8 w-140 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Request Withdrawal</h2>
          <button onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>

        <p className="text-left text-sm text-gray-500">
          Available balance:{" "}
          <span className="font-bold text-green-600">
            ₦{Number(availableBalance).toLocaleString()}
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 items-center"
        >
          <div className="flex flex-col w-full">
            <label className={labelClass}>Amount (₦)</label>
            <input
              type="number"
              placeholder="Enter amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={availableBalance}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Bank Name</label>
            <select
              required
              value={selectedBank?.code ?? ""}
              onChange={handleBankChange}
              disabled={loadingBanks}
              className={`${inputClass} bg-white appearance-none`}
            >
              <option value="" disabled>
                {loadingBanks ? "Loading banks..." : "Select your bank"}
              </option>
              {banks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
            {bankAvailability && availabilityBadge[bankAvailability]}
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Account Number</label>
            <input
              type="text"
              placeholder="10-digit account number"
              required
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/, "").slice(0, 10))
              }
              className={inputClass}
            />
            {verifying && (
              <span className="text-xs text-gray-500 pl-2 pt-1">
                Verifying account...
              </span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Account Name</label>
            <input
              type="text"
              placeholder="Auto-filled after verification"
              readOnly
              value={accountName}
              className={`${inputClass} bg-gray-50 text-gray-600 cursor-not-allowed`}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={
              loading ||
              verifying ||
              !accountName ||
              Number(availableBalance) === 0 ||
              bankAvailability === "unavailable"
            }
            className="font-bold bg-purple-500 text-white h-12 w-full rounded-full cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default WithdrawCard;
