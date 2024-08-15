import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function extractOnlyChildren(children: React.ReactNode, displayName: string) {
  let _child: JSX.Element | null = null;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    // @ts-expect-error displayName exists
    if (child && child.type.displayName === displayName) {
      _child = child;
    }
  });
  return _child;
}

type ComponentMap = Record<string, React.ReactNode>;

type ReturnTypeOfExtractChildren<T> = Partial<{
  [K in keyof T]: React.ReactElement;
}>;

export function extractChildren<T extends ComponentMap>(
  children: React.ReactNode,
  childrenMap: T
): ReturnTypeOfExtractChildren<T> {
  const newObjectWithChild: ReturnTypeOfExtractChildren<T> = {};

  const Keys: (keyof T)[] = Object.keys(childrenMap);

  Keys.forEach((key) => {
    const displayName = childrenMap[key] as string;
    const child = extractOnlyChildren(children, displayName);
    if (child) {
      newObjectWithChild[key] = extractOnlyChildren(children, displayName);
    }
  });

  return newObjectWithChild;
}
