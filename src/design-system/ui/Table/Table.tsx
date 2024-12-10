import * as React from "react";

import { cn } from "@/design-system/utils/utils";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    aria-label="table-header"
    className={cn("", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    aria-label="table-body"
    className={cn("flex flex-col", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

type TableRowsProps = {
  isSelected?: boolean;
} & React.HTMLAttributes<HTMLTableRowElement>;

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowsProps>(
  ({ className, isSelected, ...props }, ref) => (
    <tr
      role="row"
      ref={ref}
      className={cn(
        "group/row",
        isSelected && "bg-background-card",
        "border-b border-accent-border",
        "transition-colors flex flex-row hover:bg-muted/50 w-full data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

type CellProps = {
  width?: number;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

type HeadProps = {
  width?: number;
  resizable?: boolean;
  resizableProps?: object;
  style?: React.CSSProperties;
} & React.TdHTMLAttributes<HTMLTableCellElement>;

const TableHead = React.forwardRef<HTMLTableCellElement, HeadProps>(
  ({ className, width, resizable, style, resizableProps, ...props }, ref) => {
    const _style: React.CSSProperties = {};
    if (width) {
      _style.width = width + "px";
    } else {
      _style.flex = "1";
    }
    return (
      <th
        style={{
          ..._style,
          ...style,
        }}
        role="cell"
        ref={ref}
        className={cn(
          "h-8 px-2 flex relative group items-center text-left shrink-0 text-xs font-normal text-text-muted [&:has([role=checkbox])]:pr-0",
          className,
        )}
        {...props}
      >
        {props.children}
        {resizable && (
          <div
            {...resizableProps}
            className="absolute select-none touch-none cursor-col-resize right-0 top-0 h-full w-2 group-hover:bg-accent-border"
          />
        )}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, CellProps>(
  ({ className, width, ...props }, ref) => {
    const style: React.CSSProperties = {};
    if (width) {
      style.width = width + "px";
    } else {
      style.flex = "1";
    }
    return (
      <td
        role="gridcell"
        tabIndex={0}
        style={{
          ...style,
        }}
        ref={ref}
        className={cn(
          "align-middle shrink-0 [&:has([role=checkbox])]:pr-0 box-border focus:border-primary",
          className,
        )}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-text-text-muted", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

const Table = Object.assign(
  React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
      <div className="relative w-full  overflow-auto flex flex-col pb-3">
        <table
          data-component="Table"
          ref={ref}
          className={cn(
            "w-fit min-w-full caption-bottom text-sm block whitespace-nowrap",
            className,
          )}
          {...props}
        />
      </div>
    ),
  ),
  {
    Header: TableHeader,
    Body: TableBody,
    Footer: TableFooter,
    Head: TableHead,
    Row: TableRow,
    Cell: TableCell,
    Caption: TableCaption,
    displayName: "Table",
  },
);

export { Table };
