import { useState } from "react";
import { api } from "../api/axios";
import CloseIcon from "@mui/icons-material/CloseRounded";

type Props = {
  availableBalance: number;
  onClose: () => void;
  onSuccess: () => void;
};

const WithdrawCard = ({ availableBalance, onClose, onSuccess }: Props) => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/seller/withdrawals", {
        amount: parseFloat(amount),
        bankName,
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
            <input
              type="text"
              placeholder="e.g. Access Bank"
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Account Number</label>
            <input
              type="text"
              placeholder="10-digit account number"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className={labelClass}>Account Name</label>
            <input
              type="text"
              placeholder="Account holder name"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || Number(availableBalance) === 0}
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
