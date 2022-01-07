import { h } from "preact";
import { useState } from "preact/hooks";
import Button from "@app/components/button.jsx";
import DateInput from "@app/components/date_input.jsx";
import SquareCheck from "./square_check.jsx";

function Closed({ id, title, _done, onOpen }) {
  // FIXME: use task itself ...
  const [done, setDone] = useState(false);

  return (
    <div class="flex flex-row items-center w-full">
      <SquareCheck checked={done} onChange={setDone} />
      <button class="text-sm font-medium pl-4 dark:text-white" onClick={onOpen}>
        {title != null && title.length > 0
          ? title
          : (
            <span class="dark:text-gray-600 text-gray-400">
              (Untitled To-Do)
            </span>
          )}
      </button>
    </div>
  );
}

function Open({ id, onClose }) {
  // FIXME: use task itself ...
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState("test");
  const [date, setDate] = useState(null);

  return (
    <div class="
      flex flex-col w-full
      p-2 -mx-2 shadow-lg rounded-md
      dark:text-white dark:bg-slate-900 bg-slate-50
    ">
      <div class="flex flex-row items-center w-full">
        <SquareCheck checked={done} onChange={setDone} />
        <input
          class="text-base font-medium mx-4 w-full bg-inherit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button title="Done" onClick={onClose} />
      </div>
      <div class="flex flex-col ml-10 mt-2 space-y-2">
        <textarea class="min-h-[5em] bg-inherit text-sm">
          This is a test
        </textarea>
        <div class="flex justify-end">
          <DateInput value={date} onChange={setDate} />
        </div>
      </div>
    </div>
  );
}

export default function Task({ id, title, done }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <Open
        id={id}
        onClose={() => setOpen(false)}
      />
    );
  } else {
    return (
      <Closed
        id={id}
        title={title}
        done={done}
        onOpen={() => setOpen(true)}
      />
    );
  }
}
