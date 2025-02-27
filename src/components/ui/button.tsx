
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New soft variants
        soft: "border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200",
        "soft-muted": "border border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200 focus:bg-gray-200",
        "soft-teal": "border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 focus:bg-teal-200",
        "soft-blue": "border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:bg-blue-200",
        "soft-red": "border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:bg-red-200",
        "soft-yellow": "border border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:bg-yellow-200",
        "soft-white": "border border-transparent bg-white/10 text-white hover:bg-white/20 focus:bg-white/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
