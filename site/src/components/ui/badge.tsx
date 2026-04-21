import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge — Restyled to Uber Design System
 *
 * - All badges: radius 9999px (pill), 12px font, 500 weight, 4px 10px padding
 * - Semantic variants exactly per spec:
 *   free:      uber-green-light bg, uber-green-dark text
 *   limit:     #FFF8EC bg, #B46B00 text
 *   accepted:  uber-gray-50 bg, uber-gray-700 text
 *   warning:   #FFF0EE bg, danger text
 *   mandatory: uber-green-light bg, uber-green-dark text
 *   voluntary: uber-gray-50 bg, uber-gray-600 text
 *   nolaw:     #FFF0EE bg, danger text
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-uber-pill text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        // Default: black pill
        default:
          "bg-uber-black text-white px-2.5 py-0.5",
        // Outline: black border
        outline:
          "border border-uber-black text-uber-black bg-white px-2.5 py-0.5",
        // Semantic variants (from spec)
        free:
          "bg-uber-green-light text-uber-green-dark px-2.5 py-0.5",
        limit:
          "bg-[#FFF8EC] text-[#B46B00] px-2.5 py-0.5",
        accepted:
          "bg-uber-gray-50 text-uber-gray-700 px-2.5 py-0.5",
        warning:
          "bg-[#FFF0EE] text-danger px-2.5 py-0.5",
        // State law status badges
        mandatory:
          "bg-uber-green-light text-uber-green-dark px-2.5 py-0.5",
        voluntary:
          "bg-uber-gray-50 text-uber-gray-600 px-2.5 py-0.5",
        nolaw:
          "bg-[#FFF0EE] text-danger px-2.5 py-0.5",
        // Success / green
        success:
          "bg-uber-green-light text-uber-green-dark px-2.5 py-0.5",
        // Secondary: gray
        secondary:
          "bg-uber-gray-50 text-uber-gray-600 px-2.5 py-0.5",
        // Destructive
        destructive:
          "bg-[#FFF0EE] text-danger px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
