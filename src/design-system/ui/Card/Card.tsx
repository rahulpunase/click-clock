import { Flex } from "@/design-system/layout/Flex/Flex";
import { cn, extractChildren } from "@/design-system/utils/utils";
import React, { useState } from "react";

import { Content, Image } from "./Card.Content";
import { CardContext, useCardContext } from "./Card.Context";
import Footer from "./Card.Footer";
import Header from "./Card.Header";

type CardProps = {
  children: JSX.Element | JSX.Element[];
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

const Description = Object.assign(
  React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )),
  {
    displayName: "Description",
  }
);

const CardWrapper = ({
  children,
  isSelectable,
  isCollapsible,
  orientation = "vertical",
  className,
  ...props
}: CardProps) => {
  const extractedChildren = extractChildren(children, {
    header: Header,
    content: Content,
    footer: Footer,
    image: Image,
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
        "rounded-lg border border-accent-border bg-card shadow-sm overflow-hidden box-border",
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
          {extractedChildren.content &&
            React.cloneElement(extractedChildren.content, {
              ...extractedChildren.content?.props,
              className: cn(!extractedChildren.header && "pt-4"),
            })}
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

const Card = Object.assign(
  ({ ...props }: CardProps) => {
    return (
      <CardProvider>
        <CardWrapper {...props} />
      </CardProvider>
    );
  },
  {
    Header,
    Footer,
    Description,
    Content,
    Image,
  }
);

export { Card };
