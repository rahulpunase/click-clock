import { Button } from "@/design-system/ui/Button/Button";
import { Calendar, CalendarProps } from "@/design-system/ui/Calendar/Calendar";
import { Popover } from "@/design-system/ui/Popover/Popover";
import { cn } from "@/design-system/utils/utils";

type DatePickerProps = {
  trigger: JSX.Element;
  defaultValue?: string;
  calendarProps: CalendarProps;
};
const DatePicker = ({
  trigger,
  calendarProps,
  defaultValue,
}: DatePickerProps) => {
  return (
    <Popover>
      <Popover.Trigger className={cn(trigger && "w-full h-full")}>
        {trigger ? (
          trigger
        ) : (
          <Button variant={"outline"}>Pick some date</Button>
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
