import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-[var(--radius)] border border-input bg-transparent px-[var(--space-2)] py-[var(--space-2)] text-[var(--font-size-base)] shadow-sm transition duration-[var(--motion-duration)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-vertical",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
