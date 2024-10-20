import { CircleOff, LucideIcon } from "lucide-react";
import { ComponentProps } from "react";
import { ErrorBoundary } from "react-error-boundary";

export type IconName = LucideIcon;

type IconProps = {
  IconName: LucideIcon;
  className?: string;
} & ComponentProps<"svg">;

const Icon = ({ IconName, className, ...props }: IconProps) => {
  return (
    <ErrorBoundary fallback={<CircleOff className={className} />}>
      <IconName className={className} {...props} />
    </ErrorBoundary>
  );
};

export default Icon;
