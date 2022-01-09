import { h } from "preact";
import { useToday } from "@hooks/useNow.js";
import useDate from "@hooks/useDate.js";

export default function DateHeader({ date }) {
  const today = useToday();
  const title = useDate(date);
  const dist = Math.abs(date.valueOf() - today.valueOf());
  const withinNextMonth = dist > 0 && dist < 30 * 24 * 60 * 60 * 1000;

  return (
    <h1 class="flex w-full space-x-4 items-center">
      {withinNextMonth && (
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
