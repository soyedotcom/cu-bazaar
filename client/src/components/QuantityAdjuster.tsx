type Props = {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
};

const QuantityAdjuster = ({ quantity, onChange, min = 1, max = 12 }: Props) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "999px",
        overflow: "hidden",
        height: "36px",
      }}
    >
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        style={{
          width: "36px",
          height: "36px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        −
      </button>
      <span
        style={{
          minWidth: "28px",
          textAlign: "center",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        style={{
          width: "36px",
          height: "36px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityAdjuster;
