import { Link, LinkProps } from "react-router-dom";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  theme: string;
}

export default function Anchor({
  to,
  children,
  theme,
  ...props
}: CustomLinkProps): JSX.Element {
  const variant = theme == "light" ? "" : "";

  return (
    <Link to={to} className={variant} target="_blank" {...props}>
      {children}
    </Link>
  );
}
