import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function buttonClassName(variant: ButtonVariant = "primary"): string {
  return `ui-button ui-button--${variant}`;
}

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={`${buttonClassName(variant)} ${className}`.trim()} type={type} {...props} />
  );
}
