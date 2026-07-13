import { ChangeEventHandler } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface Types {
  LabelText: string;
  required: boolean;
  options: readonly SelectOption[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({
  LabelText,
  required,
  options,
  value,
  onChange,
}: Types) => {
  return (
    <div className="flex flex-col">
      <fieldset className="group min-w-0 rounded-lg border border-gray-500 px-3 focus-within:border-secondary">
        <legend className="-ml-1 px-1 text-xs font-semibold text-primary">
          {LabelText}
          {required && (
            <span className="ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </legend>
        <select
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent pb-2 pt-1 outline-none"
        >
          <option className="text-sm" value="" disabled>
            Select a state
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
};
