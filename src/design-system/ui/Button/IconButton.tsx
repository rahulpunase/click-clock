import * as React from "react";
import { icons } from "lucide-react";
import { Button } from "@/design-system/ui/Button/Button";

type Size = "xSmallIcon" | "smallIcon" | "icon";
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<React.ComponentProps<typeof Button>, "size"> {
  size?: Size;
  icon: keyof typeof icons;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, size = "icon", ...props }, ref) => {
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
