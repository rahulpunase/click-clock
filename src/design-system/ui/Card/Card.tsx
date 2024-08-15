import React, { useState } from "react";

import { cn, extractChildren } from "@/design-system/utils/utils";
import { CardContext, useCardContext } from "./Card.Context";
import CardFooter from "./Card.Footer";
import Header from "./Card.Header";
import { CardContent, CardImage } from "./Card.Content";
import { Flex } from "@/design-system/layout/Flex/Flex";

type CardProps = {
  children: JSX.Element[];
  isSelectable?: boolean;
  isCollapsible?: boolean;
  orientation?: "vertical" | "horizontal";
  className?: string;
};

const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSelected, setSelected] = useState(false);
  return (
    <CardContext.Provider
      value={{
        isExpanded,
        isSelected,
        setIsExpanded,
        setSelected,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

const Card = ({ ...props }: CardProps) => {
  return (
    <CardProvider>
      <CardWrapper {...props} />
    </CardProvider>
  );
};

const CardWrapper = ({
  children,
  isSelectable,
  isCollapsible,
  orientation = "vertical",
  className,
  ...props
}: CardProps) => {
  const extractedChildren = extractChildren(children, {
    header: "Header",
    content: "Content",
    footer: "Footer",
    image: "Image",
  });
  const { isExpanded, isSelected } = useCardContext();

  const header =
    extractedChildren.header &&
    React.cloneElement(extractedChildren.header, {
      ...extractedChildren.header.props,
      isSelectable,
      isCollapsible,
    });

  return (
    <div
      className={cn(
        "rounded-lg border border-card-border bg-card shadow-sm overflow-hidden box-border",
        isSelected && "border-primary shadow-md",
        className
      )}
      {...props}
    >
      {orientation === "vertical" && header}

      {isExpanded && orientation === "vertical" && (
        <>
          {extractedChildren.image &&
            React.cloneElement(extractedChildren.image, {
              ...extractedChildren.image?.props,
              orientation,
            })}
          {extractedChildren.content}
          {extractedChildren.footer}
        </>
      )}

      {orientation === "horizontal" && (
        <Flex className="h-full">
          {isExpanded && (
            <Flex flex="flex-1">
              {extractedChildren.image &&
                React.cloneElement(extractedChildren.image, {
                  ...extractedChildren.image?.props,
                  orientation,
                })}
            </Flex>
          )}

          <Flex
            flex="flex-1"
            direction="flex-col"
            justifyContent="justify-around"
            className="h-full"
          >
            {extractedChildren.header && header}
            {isExpanded && (
              <>
                {extractedChildren.content && (
                  <Flex flex="flex-1">{extractedChildren.content}</Flex>
                )}
                {extractedChildren.footer}
              </>
            )}
          </Flex>
        </Flex>
      )}
    </div>
  );
};

CardWrapper.displayName = "CardWrapper";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

Card.Header = Header;
Card.Footer = CardFooter;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Image = CardImage;

export { Card };
