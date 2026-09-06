import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--space-1)] whitespace-nowrap rounded-[var(--radius)] border-2 font-mono text-sm font-semibold uppercase tracking-[0.12em] cursor-pointer transition duration-[var(--motion-duration)] ease-[var(--motion-easing)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:inline-size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-foreground hover:text-background",
        outline:
          "border-input bg-background hover:bg-foreground hover:text-background",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-primary",
        ghost:
          "border-transparent hover:border-foreground hover:bg-foreground hover:text-background",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[var(--space-2)] py-[calc(var(--space-1))]",
        sm: "px-[var(--space-1)] py-[calc(var(--space-0))] text-[var(--font-size-sm)]",
        lg: "px-[var(--space-3)] py-[calc(var(--space-1)+4px)] text-[var(--font-size-lg)]",
        icon: "p-[var(--space-1)] w-[var(--space-5)] h-[var(--space-5)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
