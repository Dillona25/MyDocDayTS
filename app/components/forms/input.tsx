import type { ChangeEventHandler } from "react";

interface Types {
  LabelText: string;
  placeholder?: string;
  required: boolean;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
  LabelText,
  required,
  placeholder,
  type,
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
        <input
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent pb-2 pt-1 outline-none"
        />
      </fieldset>
    </div>
  );
};
