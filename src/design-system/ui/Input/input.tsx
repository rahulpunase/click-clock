import * as React from "react";

import Icon from "@/design-system/ui/Icon/Icon";
import { cn } from "@/design-system/utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, loading, type, ...props }, ref) => {
    return (
      <div className="w-full flex relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-accent-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute w-[40px] h-full items-center justify-center flex right-0">
          {loading && (
            <Icon name="loader-circle" className="text-primary animate-spin" />
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
