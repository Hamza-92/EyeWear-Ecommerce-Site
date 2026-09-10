import type { HTMLAttributes } from "react";

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement>;

export function VisuallyHidden({ className = "", ...props }: VisuallyHiddenProps) {
  return <span className={`ui-visually-hidden ${className}`.trim()} {...props} />;
}
