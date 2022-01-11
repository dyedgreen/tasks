import { h } from "preact";
import { useToday } from "@hooks/useNow.js";
import useDate from "@hooks/useDate.js";

const DAY = 24 * 60 * 60 * 1000;

export default function DateHeader({ date }) {
  const today = useToday();
  const title = useDate(date);
  const dist = date.valueOf() - today.valueOf();
  const withinOneWeek = Math.abs(dist) < 7 * DAY;

  return (
    <h1 class="flex w-full space-x-4 items-center">
      {withinOneWeek && (
        <div class="w-6 text-center text-xl text-slate-500 font-black">
          {date.getDate()}
        </div>
      )}
      <div class="
        grow border-t-2 mt-1
        text-sm font-semibold
        dark:border-slate-600 border-slate-300 text-slate-500
        ">
        {title}
      </div>
    </h1>
  );
}
