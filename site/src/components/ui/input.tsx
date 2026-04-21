import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input — Restyled to Uber Design System
 *
 * - Height: 48px (Uber standard input height)
 * - Border radius: 8px (uber / --radius-sm)
 * - Border: 1px solid #E2E2E2
 * - Focus: border goes to #000000 (black), 120ms transition
 * - Font: 14px, Inter
 * - Placeholder: #757575
 * - No ring offset — Uber uses border-based focus, not ring
 */

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-uber border border-uber-gray-200 bg-white px-4 py-3 text-sm text-uber-black font-normal",
          "placeholder:text-uber-gray-500",
          "transition-colors duration-uber-fast ease-uber",
          "focus:outline-none focus:border-uber-black",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-uber-gray-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-uber-black",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
