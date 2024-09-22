import { LucideIcon } from "lucide-react";

export type IconName = LucideIcon;

type IconProps = {
  IconName: LucideIcon;
  className?: string;
};

const Icon = ({ IconName, className, ...props }: IconProps) => {
  return <IconName className={className} {...props} />;
};

export default Icon;
