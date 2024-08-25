import * as React from "react";
import { icons } from "lucide-react";
import { Button } from "@/design-system/ui/Button/Button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.ComponentProps<typeof Button> {
  icon: keyof typeof icons;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, size, ...props }, ref) => {
    const LucideIcon = icons[icon];
    const iconClass = size === "xSmallIcon" ? "size-[14px]" : "size-4";
    return (
      <Button size={size} ref={ref} className={className} {...props}>
        <LucideIcon className={iconClass} />
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton };
