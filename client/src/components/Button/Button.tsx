import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme: "light" | "dark";
}

export default function Button({
  children,
  theme,
  ...props
}: ButtonProps): JSX.Element {
  const variant =
    theme == "light"
      ? "border-2 border-dark-300 p-2 rounded-md m-2 hover:bg-dark-200"
      : "border-2 border-light-300 p-2 rounded-md m-2 hover:bg-dark-500";

  return (
    <button className={variant} {...props}>
      {children}
    </button>
  );
}
