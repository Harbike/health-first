import { Check } from "lucide-react";

function PasswordRule({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className={`w-4 h-4 flex items-center justify-center rounded-full border transition-all ${
          checked
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-400"
        }`}
      >
        {checked && <Check size={10} strokeWidth={3} />}
      </div>

      <span className={checked ? "text-green-600" : "text-gray-600"}>
        {label}
      </span>
    </div>
  );
}

export default PasswordRule;
