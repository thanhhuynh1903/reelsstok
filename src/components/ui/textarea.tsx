import * as React from "react"

import { cn } from "@/utils/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  helperText?: string
  showCharCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, showCharCount, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === "string" ? value.length : 0

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            // Dark theme styles for video platform
            "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400",
            "focus:border-purple-500 focus:ring-purple-500/20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          ref={ref}
          value={value}
          maxLength={maxLength}
          {...props}
        />
        <div className="flex justify-between items-center mt-1">
          {helperText && <p className={cn("text-xs", error ? "text-red-400" : "text-gray-500")}>{helperText}</p>}
          {(showCharCount || maxLength) && (
            <p className="text-xs text-gray-500 ml-auto">
              {currentLength}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
