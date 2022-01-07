import { h } from "preact";
import { useState } from "preact/hooks";
import useDate from "@hooks/useDate.js";
import { Calendar, Trash } from "@app/components/icons.jsx";

function toDate(string) {
  if (/^\d{4}-\d\d-\d\d$/.test(string)) {
    const [year, month, day] = string.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    return null;
  }
}

function toString(date) {
  if (date != null) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return "";
  }
}

export default function DateInput({ value, onChange }) {
  const [showInput, setShowInput] = useState(false);
  const date = useDate(value ?? new Date());

  if (showInput) {
    return (
      <div class="flex h-8 px-2 rounded space-x-2 text-white bg-slate-500">
        <input
          class="h-8 bg-inherit"
          type="date"
          value=""
          onBlur={(e) => {
            onChange(toDate(e.target.value));
            setShowInput(false);
          }}
        />
        <button
          onClick={() => {
            setShowInput(false);
            onChange(null);
          }}
        >
          <Trash />
        </button>
      </div>
    );
  } else {
    return (
      <button
        class="flex h-8 justify-center items-center space-x-1"
        onClick={() => setShowInput(true)}
      >
        <Calendar class={value != null ? "text-red-500" : "text-slate-500"} />
        <span
          class={`text-sm font-semibold ${
            value != null
              ? "dark:text-slate-200 text-slate-700"
              : "text-slate-500"
          }`}
        >
          {value != null ? date : "Due Date"}
        </span>
      </button>
    );
  }
}
