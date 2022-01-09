import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useQuery, useRows } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import Button from "@app/components/button.jsx";
import { CheckCircle } from "@app/components/icons.jsx";
import DateInput from "./date_input.jsx";
import SquareCheck from "./square_check.jsx";

export default function Open({ id, onClose }) {
  const [{ title, description, done, due }] = useRows(
    "SELECT * FROM tasks WHERE id = :id",
    { id },
  );

  const doneQuery = useQuery(`UPDATE tasks SET done = :done WHERE id = :id`);
  const setDone = (isDone) =>
    doneQuery({ done: isDone ? new Date() : null, id });

  const titleQuery = useQuery(`UPDATE tasks SET title = :title WHERE id = :id`);
  const [titleInput, setTitleInput] = useDebounced(
    title,
    (title) => titleQuery({ id, title }),
  );

  const [dueInput, setDueInput] = useState(new Date(due));

  const ref = useRef();
  useEffect(() => {
    const onEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    document.addEventListener("mousedown", onEvent);
    return () => {
      document.removeEventListener("mousedown", onEvent);
    };
  }, [ref, onClose]);

  return (
    <div
      ref={ref}
      class="
      flex flex-col w-full box-content
      p-2 -mx-2 shadow-lg rounded-md
      dark:text-white dark:bg-slate-900 bg-slate-50
    "
    >
      <div class="flex flex-row items-center w-full">
        <SquareCheck checked={done} onChange={setDone} />
        <input
          class="text-base font-medium mx-4 w-full bg-inherit"
          value={titleInput}
          onInput={(e) => setTitleInput(e.target.value)}
          placeholder="Untitled To-Do"
        />
        <Button title="Done" onClick={onClose} />
      </div>
      <div class="flex flex-col ml-10 mt-2 space-y-2">
        <textarea
          class="min-h-[5em] bg-inherit text-sm"
          placeholder="Add notes"
        >
          {description}
        </textarea>
        <div class="flex justify-start space-x-4">
          <DateInput value={dueInput} onChange={setDueInput} />
          <Button
            icon={<CheckCircle />}
            title="Checklist"
            onClick={() => alert("TODO")}
            flat
          />
        </div>
      </div>
    </div>
  );
}
