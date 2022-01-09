import { useToday } from "./useNow.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/** Returns a formatted relative date. */
export default function useDate(date) {
  const now = useToday(MIN);
  const dist = date.valueOf() - now.valueOf();

  if (Math.abs(dist) < DAY && now.getDate() === date.getDate()) {
    return "Today";
  } else if (dist > 0 && dist < 2 * DAY) {
    return "Tomorrow";
  } else if (dist < 0 && Math.abs(dist) < 2 * DAY) {
    return "Yesterday";
  } else if (Math.abs(dist) < 7 * DAY) {
    if (dist > 0) {
      return DAYS[date.getDay()];
    } else {
      return `Last ${DAYS[date.getDay()]}`;
    }
  } else {
    return `${date.getDate()} ${
      MONTHS[date.getMonth()]
    }. ${date.getFullYear()}`;
  }
}
