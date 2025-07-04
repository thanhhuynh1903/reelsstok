import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, helperText, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            // Dark theme styles for video platform
            "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400",
            "focus:border-purple-500 focus:ring-purple-500/20",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
        {helperText && <p className={cn("mt-1 text-xs", error ? "text-red-400" : "text-gray-500")}>{helperText}</p>}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
