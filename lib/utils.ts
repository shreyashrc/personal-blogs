import { format } from "date-fns";

export function formatDate(dateStr: string) {
  try {
    return format(new Date(dateStr), "LLL d, yyyy");
  } catch {
    return dateStr;
  }
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

