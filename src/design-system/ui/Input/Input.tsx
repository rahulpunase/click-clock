import { LoaderCircle } from "lucide-react";
import * as React from "react";

import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { cn } from "@/design-system/utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  icon?: IconName;
  size?: "small" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, loading, icon, type, size, ...props }, ref) => {
    return (
      <div className="w-full flex relative">
        <div className="absolute w-[40px] h-full items-center justify-center flex left-0 text-text">
          {icon && <Icon IconName={icon} className="size-5" />}
        </div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-accent-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-dull focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "[&[aria-invalid='true']]:focus-visible:ring-destructive",
            size === "small" && "h-6",
            icon && "pl-[40px]",
            className,
          )}
          ref={ref}
          {...props}
        />
        {loading && (
          <div className="absolute w-[40px] h-full items-center justify-center flex right-0">
            <Icon
              IconName={LoaderCircle}
              className="text-primary animate-spin"
            />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
