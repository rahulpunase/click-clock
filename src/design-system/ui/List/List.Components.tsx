import { ComponentProps } from "react";

import Icon, { IconName } from "@/design-system/ui/Icon/Icon";

const Label = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div className="text-sm text-ellipsis truncate select-none" {...props} />
  );
};

Label.displayName = "Label";

const SubText = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      className="text-xs text-ellipsis truncate text-text-muted"
      {...props}
    />
  );
};

SubText.displayName = "SubText";

const Action = ({ ...props }: ComponentProps<"div">) => {
  return <div className="invisible group-hover/list-item:visible" {...props} />;
};

Action.displayName = "Action";

const SmallIcon = ({ icon }: { icon: IconName }) => {
  return <Icon className="size-3" IconName={icon} />;
};

SmallIcon.displayName = SmallIcon;

export { Label, Action, SubText, SmallIcon };
