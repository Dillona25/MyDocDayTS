import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  LabelText: string;
  required: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { LabelText, required, className, ...inputProps },
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
        <input
          ref={ref}
          required={required}
          className={`w-full bg-transparent pb-2 pt-1 outline-none ${className ?? ""}`}
          {...inputProps}
        />
      </fieldset>
    </div>
  );
});
