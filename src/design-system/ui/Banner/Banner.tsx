import { cva, VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import React, { ComponentProps } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";
import { cn } from "@/design-system/utils/utils";

const bannerVariant = cva("p-3 rounded-sm", {
  variants: {
    variant: {
      primary: "text-primary border border-primary bg-primary-light",
      success: "text-green-600 border border-green-600 bg-green-50",
      warning: "text-yellow-600 border border-yellow-600 bg-yellow-50",
      error: "text-destructive border border-destructive bg-destructive-light",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type BannerProps = {
  text: string;
  withX?: boolean;
} & VariantProps<typeof bannerVariant> &
  ComponentProps<"div">;

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ variant, text, withX, className }, ref) => {
    return (
      <Flex
        ref={ref}
        alignItems="items-center"
        gap="gap-4"
        className={cn(bannerVariant({ variant, className }))}
      >
        <Text variant="heading-1">{text}</Text>
        {withX && <Icon IconName={X} className="size-4" />}
      </Flex>
    );
  },
);

export default Banner;
