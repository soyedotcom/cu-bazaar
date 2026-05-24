type Props = {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
};

const QuantityAdjuster = ({ quantity, onChange, min = 1, max = 20 }: Props) => {
  return (
    <div className="flex h-9 items-center border border-gray-300 rounded-full">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="w-9 h-9 cursor-pointer"
      >
        −
      </button>
      <span className="w-7 text-center font-medium">{quantity}</span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="w-9 h-9 cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;
