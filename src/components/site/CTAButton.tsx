import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  icon?: boolean;
  children: ReactNode;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", size = "md", icon = true, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
    const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
    const variants = {
      primary:
        "bg-ink text-white hover:bg-[oklch(0.3_0.025_280)] shadow-soft",
      ghost: "text-ink hover:text-accent",
      outline:
        "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
    };
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(base, sizes[size], variants[variant], className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <span>{children}</span>
        {icon && (
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </motion.button>
    );
  },
);
CTAButton.displayName = "CTAButton";
