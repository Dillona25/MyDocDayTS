import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  LabelText: string;
  required: boolean;
  options: readonly SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      LabelText,
      required,
      options,
      placeholder = "Select a state",
      ...selectProps
    },
    ref,
  ) {
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
            ref={ref}
            required={required}
            className="w-full bg-transparent pb-2 pt-1 outline-none"
            {...selectProps}
          >
            <option className="text-sm" value="" disabled>
              {placeholder}
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
  },
);
