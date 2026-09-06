import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-[var(--radius)] border-2 border-input bg-transparent px-[var(--space-2)] py-[var(--space-2)] text-[var(--font-size-base)] transition duration-[var(--motion-duration)] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none resize-vertical",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
