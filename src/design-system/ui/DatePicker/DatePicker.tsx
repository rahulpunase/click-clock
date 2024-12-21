import { Button } from "@/design-system/ui/Button/Button";
import { Calendar, CalendarProps } from "@/design-system/ui/Calendar/Calendar";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { cn } from "@/design-system/utils/utils";

type DatePickerProps = {
  trigger: JSX.Element;
  defaultValue?: string;
  calendarProps: CalendarProps;
  open?: boolean;
};
const DatePicker = ({
  trigger,
  calendarProps,
  defaultValue,
  open,
}: DatePickerProps) => {
  return (
    <Popover open={open}>
      <Popover.Trigger className={cn(trigger && "w-full h-full")} asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="w-full" block variant={"outline"}>
            Pick some date
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Content.Main>
          <Calendar {...calendarProps} />
        </Popover.Content.Main>
      </Popover.Content>
    </Popover>
  );
};

export { DatePicker };
