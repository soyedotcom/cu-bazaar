type Props = {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
};

const VariantSelector = ({ label, options, value, onChange }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-bold">{label}:</span>

      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-0.5 border rounded-full cursor-pointer transition-all
        duration-200 ${value === option ? "bg-black text-white" : ""}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default VariantSelector;
