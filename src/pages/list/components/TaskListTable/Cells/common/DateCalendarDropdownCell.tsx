import { Calendar, CalendarX2 } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import Cell from "@/design-system/patterns/Cell";
import { DatePicker } from "@/design-system/ui/DatePicker/DatePicker";

type DateCalendarDropdownCellProps = {
  defaultValue?: string;
  onSelect?: SelectSingleEventHandler;
};
const DateCalendarDropdownCell = ({
  defaultValue,
  onSelect,
}: DateCalendarDropdownCellProps) => {
  return (
    <DatePicker
      calendarProps={{
        onSelect: onSelect,
        mode: "single",
      }}
      trigger={
        <Cell
          icon={defaultValue !== "N.A." ? Calendar : CalendarX2}
          name="date"
          isEditable
          defaultValue={defaultValue}
        />
      }
    />
  );
};

export default DateCalendarDropdownCell;
