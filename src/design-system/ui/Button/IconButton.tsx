import * as React from "react";

import { Button } from "@/design-system/ui/Button/Button";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";

type Size = "xSmallIcon" | "smallIcon" | "icon";
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<React.ComponentProps<typeof Button>, "size"> {
  size?: Size;
  icon: IconName;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, size = "icon", ...props }, ref) => {
    const iconClass = size === "xSmallIcon" ? "size-[14px]" : "size-4";

    return (
      <Button size={size} ref={ref} className={className} {...props}>
        <Icon name={icon} className={iconClass} />
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton };
