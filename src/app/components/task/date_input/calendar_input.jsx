import { h } from "preact";
import { useState } from "preact/hooks";
import { useToday } from "@hooks/useNow.js";
import { ArrowLeft, Lightning } from "@app/components/icons.jsx";

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

function Day({ label, onClick, skip = 0, subtle }) {
  return (
    <button
      class={`
        flex h-8 w-10 text-sm text-center items-center justify-center
        hover:dark:bg-slate-200 hover:bg-slate-800
        rounded-md ${skipClass(skip)}
        ${subtle ? "text-slate-500" : ""}
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

  const nextMonth = () => {
    setMonthInput((monthInput + 1) % 12);
    if (monthInput === 11) setYearInput(yearInput + 1);
  };

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
            <option class="text-black" value={0}>Jan</option>
            <option class="text-black" value={1}>Feb</option>
            <option class="text-black" value={2}>Mar</option>
            <option class="text-black" value={3}>Apr</option>
            <option class="text-black" value={4}>May</option>
            <option class="text-black" value={5}>Jun</option>
            <option class="text-black" value={6}>Jul</option>
            <option class="text-black" value={7}>Aug</option>
            <option class="text-black" value={8}>Sep</option>
            <option class="text-black" value={9}>Oct</option>
            <option class="text-black" value={10}>Nov</option>
            <option class="text-black" value={11}>Dec</option>
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
          const isToday = yearInput === year && monthInput === month &&
            day === today.getDate();
          return (
            <Day
              label={isToday ? <Lightning class="w-4 h-4" /> : day}
              onClick={() => onInput(new Date(yearInput, monthInput, day))}
              skip={day === 1 ? offset : ""}
              subtle={(offset + day - 1) % 7 >= 5}
            />
          );
        })}
        <Day
          label={<ArrowLeft class="w-4 h-4" />}
          onClick={nextMonth}
          subtle
        />
      </div>
    </div>
  );
}
