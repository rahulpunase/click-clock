import * as React from "react";
import { cn } from "../../utils/utils";
import { icons } from "lucide-react";
import { Button } from "./Button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<React.ComponentProps<typeof Button>, "size"> {
  icon: keyof typeof icons;
  small?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, ...props }, ref) => {
    const LucideIcon = icons[icon];
    const iconClass = props.small ? "size-[14px]" : "size-4";
    return (
      <Button
        className={cn(className, props.small && "size-6")}
        size="icon"
        ref={ref}
        {...props}
      >
        <LucideIcon className={iconClass} />
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };
