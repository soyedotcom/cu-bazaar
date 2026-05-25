type Props = {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
};

const VariantSelector = ({
  label,
  options,
  value,
  onChange,
  required,
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <p className="font-semibold">{label}</p>
        {required && !value && (
          <span className="text-red-500 text-sm">
            Please select a {label.toLowerCase()}
          </span>
        )}
      </div>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-1.5 rounded-full border cursor-pointer text-sm font-semibold transition-all ${
              value === option
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
