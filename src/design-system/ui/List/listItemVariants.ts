import { cva } from "class-variance-authority";

const listItemVariants = ({ isSelected }: { isSelected: boolean }) =>
  cva(
    "h-[34px] px-2 rounded-md group/list-item cursor-pointer user-select-none",
    {
      variants: {
        variant: {
          default: ["bg-secondary"],
          nav: [
            "bg-transparent hover:bg-secondary",
            isSelected &&
              "bg-primary-light hover:bg-primary-light text-primary-dark font-medium",
          ],
          secondary: ["text-text-muted bg-transparent hover:bg-accent"],
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

export { listItemVariants };
