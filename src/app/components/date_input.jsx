import { h } from "preact";
import { useState } from "preact/hooks";
import { Calendar, Trash } from "./icons.jsx";

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

// FIXME: This is broken ...
export default function DateInput({ value, onChange }) {
  const [showInput, setShowInput] = useState(false);
  if (showInput) {
    return (
      <div class="flex h-8 px-2 rounded bg-slate-500">
        <input
          class="h-8 text-white bg-inherit"
          type="date"
          value={toString(value)}
          onChange={(e) => onChange(toDate(e.target.value))}
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
        class="w-8 h-8 text-slate-500"
        onClick={() => setShowInput(true)}
      >
        <Calendar />
      </button>
    );
  }
}
