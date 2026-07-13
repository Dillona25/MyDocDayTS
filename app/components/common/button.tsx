interface btnProps {
  buttonText: string;
  className?: string;
  varient?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Button = ({
  buttonText,
  className,
  varient,
  disabled,
  type,
  onClick,
}: btnProps) => {
  let btnClass = "";

  if (varient === "primary") {
    btnClass =
      "button-primary text-primary cursor-pointer text-sm font-bold hover:bg-white";
  } else if (varient === "secondary") {
    btnClass = "button-secondary cursor-pointer text-sm font-bold";
  }

  let baseClass = `${className} text-sm font-bold text-white cursor-pointer`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={btnClass !== "" ? btnClass : baseClass}
    >
      {buttonText}
    </button>
  );
};
