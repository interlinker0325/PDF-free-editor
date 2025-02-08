import React from "react"

export function Badge({ children, className = '',variant = "default" }) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variants = {
    default: "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
  }

  return <div className={`${className} ${baseStyles} ${variants[variant]}`}>{children}</div>
}