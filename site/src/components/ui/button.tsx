import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button — Restyled to Uber Design System
 *
 * - Default: black bg, white text (Uber's primary CTA)
 * - Accent: uber-green bg, black text
 * - Ghost: no bg, black text (Uber's "Sign in" style)
 * - Outline: 1px black border, white bg
 * - Pill: full pill radius variant (border-radius 9999px)
 * - Border radius: 8px (--radius-sm / Uber standard)
 * - Inter font, 500 weight on all buttons
 * - Transition: 120ms ease-uber
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-uber-fast ease-uber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uber-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Uber primary: solid black
        default:
          "bg-uber-black text-white hover:bg-uber-gray-800 active:bg-uber-gray-700",
        // Uber accent: green CTA
        accent:
          "bg-uber-green text-uber-black hover:bg-uber-green-dark active:bg-uber-green-dark",
        // Destructive
        destructive:
          "bg-danger text-white hover:bg-danger/90 active:bg-danger/80",
        // Outline: 1px black border, transparent bg  
        outline:
          "border border-uber-black bg-white text-uber-black hover:bg-uber-black hover:text-white active:bg-uber-gray-800",
        // Ghost: no border, no bg — used for "Sign in" type links
        ghost:
          "text-uber-black hover:bg-uber-gray-50 active:bg-uber-gray-100",
        // Link style
        link: "text-uber-black underline-offset-4 hover:underline",
        // Secondary: gray bg
        secondary:
          "bg-uber-gray-50 text-uber-black hover:bg-uber-gray-100 active:bg-uber-gray-200",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm rounded-uber",
        sm: "h-9 px-3 text-sm rounded-uber",
        lg: "h-12 px-8 text-body rounded-uber",
        icon: "h-10 w-10 rounded-uber",
        // Uber pill CTA (used in hero, promo strips)
        pill: "h-12 px-6 text-sm rounded-uber-pill",
        "pill-sm": "h-10 px-5 text-sm rounded-uber-pill",
        "pill-xs": "h-9 px-4 text-xs rounded-uber-pill",
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
