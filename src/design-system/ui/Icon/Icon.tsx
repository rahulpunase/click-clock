import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense
      fallback={
        <div
          className={props.className}
          style={{ background: "transparent" }}
        />
      }
    >
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default Icon;
