import { h } from "preact";
import { useState } from "preact/hooks";
import { useToday } from "@hooks/useNow.js";
import { Lightning } from "@app/components/icons.jsx";

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const daysInMonth = (year, month) => {
  switch (month) {
    case 0:
      return 31;
    case 1:
      return isLeapYear(year) ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
};

const skipClass = (skip) => {
  switch (skip) {
    case 1:
      return "col-start-2";
    case 2:
      return "col-start-3";
    case 3:
      return "col-start-4";
    case 4:
      return "col-start-5";
    case 5:
      return "col-start-6";
    case 6:
      return "col-start-7";
  }
  return "";
};

function Label({ text }) {
  return (
    <div class="w-10 text-slate-500 text-sm text-center font-semibold">
      {text}
    </div>
  );
}

function Day({ label, onClick, skip = 0 }) {
  return (
    <button
      class={`
        h-8 w-10 text-sm text-center font-normal
        hover:dark:bg-slate-200 hover:bg-slate-800
        rounded-md ${skipClass(skip)}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function CalendarInput({ style, onInput }) {
  const today = useToday();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [yearInput, setYearInput] = useState(year);
  const [monthInput, setMonthInput] = useState(month);

  const days = [];
  for (let i = 1; i <= daysInMonth(yearInput, monthInput); i++) days.push(i);
  const offset = ((new Date(yearInput, monthInput, 1).getDay()) + 6) % 7;

  return (
    <div
      class={`rounded overflow-hidden p-2 dark:bg-slate-300 bg-slate-700 ${style}`}
    >
      <div class="w-full flex text-sm dark:bg-slate-300 bg-slate-700">
        <input
          class="w-1/2 bg-inherit text-inherit text-center font-semibold p-2"
          type="number"
          value={yearInput}
          onInput={(e) => setYearInput(+e.target.value)}
        />
        <div class="w-1/2 flex justify-center">
          <select
            style={{
              "-webkit-appearance": "None",
              "-moz-appearance": "None",
              "appearance": "None",
            }}
            class="bg-inherit text-inherit text-center font-semibold px-8"
            type="number"
            value={monthInput}
            onInput={(e) => setMonthInput(+e.target.value)}
          >
            <option value={0}>Jan</option>
            <option value={1}>Feb</option>
            <option value={2}>Mar</option>
            <option value={3}>Apr</option>
            <option value={4}>May</option>
            <option value={5}>Jun</option>
            <option value={6}>Jul</option>
            <option value={7}>Aug</option>
            <option value={8}>Sep</option>
            <option value={9}>Oct</option>
            <option value={10}>Nov</option>
            <option value={11}>Dec</option>
          </select>
        </div>
      </div>
      <div class="w-full grid grid-cols-7 place-content-center place-items-center">
        <Label text="Mon" />
        <Label text="Tue" />
        <Label text="Wed" />
        <Label text="Thu" />
        <Label text="Fri" />
        <Label text="Sat" />
        <Label text="Sun" />
        {days.map((day) => {
          return yearInput === year && monthInput === month &&
              day === today.getDate()
            ? (
              <Lightning
                class={`w-4 h-4 ${day === 1 ? skipClass(offset) : ""}`}
              />
            )
            : (
              <Day
                label={day}
                onClick={() => onInput(new Date(yearInput, monthInput, day))}
                skip={day === 1 ? offset : ""}
              />
            );
        })}
      </div>
    </div>
  );
}
