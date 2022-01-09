import { h } from "preact";
import { useState } from "preact/hooks";
import { useQuery, useRows } from "@hooks/useSqlite.js";
import Button from "@app/components/button.jsx";
import { CheckCircle } from "@app/components/icons.jsx";
import DateInput from "./date_input.jsx";
import SquareCheck from "./square_check.jsx";

function Closed({ id, title, done, onOpen }) {
  const doneQuery = useQuery(`UPDATE tasks SET done = :done WHERE id = :id`);
  const setDone = (isDone) =>
    doneQuery({ done: isDone ? new Date() : null, id });

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

function ChecklistItem({ id, title, done }) {
  return;
}

function Open({ id, onClose }) {
  // FIXME: use task itself ...
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState("test");
  const [date, setDate] = useState(null);

  return (
    <div class="
      flex flex-col w-full box-content
      p-2 -mx-2 shadow-lg rounded-md
      dark:text-white dark:bg-slate-900 bg-slate-50
    ">
      <div class="flex flex-row items-center w-full">
        <SquareCheck checked={done} onChange={setDone} />
        <input
          class="text-base font-medium mx-4 w-full bg-inherit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled To-Do"
        />
        <Button title="Done" onClick={onClose} />
      </div>
      <div class="flex flex-col ml-10 mt-2 space-y-2">
        <textarea
          class="min-h-[5em] bg-inherit text-sm"
          placeholder="Add notes"
        >
          This is a test
        </textarea>
        <div class="flex justify-start space-x-4">
          <DateInput value={date} onChange={setDate} />
          <Button icon={<CheckCircle />} title="Checklist" flat />
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
