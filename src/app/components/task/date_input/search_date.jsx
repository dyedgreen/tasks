import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useToday } from "@hooks/useNow.js";
import { format } from "@hooks/useDate.js";
import { Calendar, Clock, Lightning } from "@app/components/icons.jsx";
import TextInput from "@app/components/text_input.jsx";

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function maybeMonth(text) {
  if (text.length > 0) {
    for (let idx = 0; idx < MONTHS.length; idx++) {
      if (MONTHS[idx].includes(text.toLowerCase())) return idx + 1;
    }
  } else {
    return null;
  }
}

/** Return a list of the closest matching future date. */
export function fuzzySearch(query) {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  const thisDate = now.getDate();

  const numbers = query
    .split(/\D+/)
    .map((str) => parseInt(str))
    .filter((num) => !isNaN(num));

  const month = query
    .split(/[^a-zA-Z]+/)
    .map(maybeMonth)
    .find((month) => month != null);
  if (month != null && numbers.length === 1) {
    numbers[1] = month;
    if (numbers[0] > 31) {
      numbers[2] = numbers[0];
      numbers[0] = 1;
    }
  } else if (month != null && numbers.length >= 2) {
    numbers[2] = numbers[1];
    numbers[1] = month;
  } else if (month != null && numbers.length === 0) {
    numbers[0] = 1;
    numbers[1] = month;
  }

  if (numbers.length > 0 && numbers.length <= 3) {
    switch (numbers.length) {
      case 1:
        return [
          new Date(thisYear, thisMonth, numbers[0]),
          new Date(thisYear, thisMonth + 1, numbers[0]),
          new Date(thisYear, thisMonth + 2, numbers[0]),
          new Date(thisYear, thisMonth + 3, numbers[0]),
          new Date(thisYear, thisMonth + 4, numbers[0]),
          new Date(thisYear, thisMonth + 5, numbers[0]),
        ];
      case 2:
        return [
          new Date(thisYear, numbers[1] - 1, numbers[0]),
          new Date(thisYear + 1, numbers[1] - 1, numbers[0]),
          new Date(thisYear + 2, numbers[1] - 1, numbers[0]),
          new Date(thisYear + 3, numbers[1] - 1, numbers[0]),
        ];
      case 3:
        return [new Date(numbers[2], numbers[1] - 1, numbers[0])];
    }
  } else {
    const dates = [
      ["yesterday", new Date(thisYear, thisMonth, thisDate - 1)],
      ["today", new Date(thisYear, thisMonth, thisDate)],
      ["tomorrow", new Date(thisYear, thisMonth, thisDate + 1)],
      ["next week", new Date(thisYear, thisMonth, thisDate + 7)],
    ];
    return dates.filter(([str, _]) => str.includes(query.toLowerCase()))
      .map(([_, date]) => date);
  }

  return [];
}

export default function SearchDate({ setHasInput, onChange }) {
  const today = useToday();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setHasInput(query.length > 0);
  }, [setHasInput, query]);

  useEffect(() => document.getElementById("search-date-input").focus(), []);

  return (
    <div class="w-full">
      <TextInput
        id="search-date-input"
        class="w-full bg-inherit text-inherit text-center font-semibold p-2"
        value={query}
        onChange={setQuery}
        placeholder="Search Date"
      />
      {query.length > 0 &&
        fuzzySearch(query).map((date) => {
          let icon;
          if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            icon = <Lightning class="text-yellow-500" />;
          } else if (date != null && date.valueOf() < today.valueOf()) {
            icon = <Clock class="text-inherit" />;
          } else {
            icon = (
              <Calendar
                class={date != null ? "text-red-500" : "text-slate-500"}
              />
            );
          }
          return (
            <button
              class="
              flex items-center justify-start
              w-full font-bold text-sm text-left p-2 space-x-2
              rounded hover:dark:bg-slate-300 hover:bg-slate-700
            "
              onClick={() => onChange(date)}
            >
              {icon}
              <span>{format(today, date)}</span>
            </button>
          );
        })}
    </div>
  );
}
