import * as React from "react";
import { cn } from "../../utils/utils";
import { icons } from "lucide-react";
import { Button } from "./Button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.ComponentProps<typeof Button> {
  icon: keyof typeof icons;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className = false, icon, ...props }, ref) => {
    const LucideIcon = icons[icon];
    return (
      <Button className={cn("h-8 w-8", className)} ref={ref} {...props}>
        <LucideIcon className="size-4" />
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };
