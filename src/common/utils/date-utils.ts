import { format } from "date-fns/format";

type AppDateFormats = "MMM, dd yyyy" | "hh:mm a" | "MMM dd, hh:mm a";

export function formatTo(
  date: Date | number | string,
  formateType: AppDateFormats,
) {
  try {
    return format(new Date(date).toISOString(), formateType);
  } catch {
    return "";
  }
}
