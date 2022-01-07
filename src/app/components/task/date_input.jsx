import { h } from "preact";
import { useState } from "preact/hooks";
import useDate from "@hooks/useDate.js";
import Button from "@app/components/button.jsx";
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
      <div class="flex px-1 rounded space-x-2 text-white bg-slate-500">
        <input
          class="bg-inherit"
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
      <Button
        icon={
          <Calendar class={value != null ? "text-red-500" : "text-slate-500"} />
        }
        style={value != null ? "dark:text-slate-200 text-slate-700" : ""}
        title={value != null ? date : "Due Date"}
        onClick={() => setShowInput(true)}
        flat
      />
    );
  }
}
