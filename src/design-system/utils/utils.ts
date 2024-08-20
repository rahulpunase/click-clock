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

type ComponentMap = Record<string, object>;

type ReturnTypeOfExtractChildren<T> = Partial<{
  [K in keyof T]: React.ReactElement;
}> & {
  remaining?: React.ReactElement | null;
};

export function extractChildren<T extends ComponentMap>(
  children: React.ReactNode,
  childrenMap: T
): ReturnTypeOfExtractChildren<T> {
  const newObjectWithChild: ReturnTypeOfExtractChildren<T> = {};
  const Keys: (keyof T)[] = Object.keys(childrenMap);

  const _children = React.Children.toArray(children);

  _children.forEach((_child) => {
    // if found
    if (!React.isValidElement(_child)) {
      return;
    }

    // @ts-expect-error displayName exists
    const childDisplayName = _child?.type?.displayName || _child?.displayName;

    const matchingKey = Keys.find(
      // @ts-expect-error displayName exists
      (key) => childDisplayName === childrenMap[key].displayName
    );

    // @ts-expect-error it can be used
    newObjectWithChild[matchingKey] = _child;
  });

  return newObjectWithChild;
}
