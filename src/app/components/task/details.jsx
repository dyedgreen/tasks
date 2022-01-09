import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useQuery, useRows } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import Button from "@app/components/button.jsx";
import { Archive, CheckCircle, Trash } from "@app/components/icons.jsx";
import DateInput from "./date_input.jsx";
import SquareCheck from "./square_check.jsx";

export default function Open({ id, onClose }) {
  const [{ title, description, done, due }] = useRows(
    "SELECT * FROM tasks WHERE id = :id",
    { id },
  );

  const doneQuery = useQuery(
    `UPDATE tasks SET done = :done, updated = :now WHERE id = :id`,
  );
  const setDone = (isDone) => {
    const now = new Date();
    doneQuery({ id, done: isDone ? now : null, now });
  };

  const titleQuery = useQuery(
    `UPDATE tasks SET title = :title, updated = :now WHERE id = :id`,
  );
  const [titleInput, setTitleInput] = useDebounced(
    title,
    (title) => titleQuery({ id, title, now: new Date() }),
  );

  const descriptionQuery = useQuery(
    `UPDATE tasks SET description = :description, updated = :now WHERE id = :id`,
  );
  const [descriptionInput, setDescriptionInput] = useDebounced(
    description ?? "",
    (description) => descriptionQuery({ id, description, now: new Date() }),
  );

  const deleteQuery = useQuery(`DELETE FROM tasks WHERE id = :id`);
  const onDelete = () => {
    const isEmptyTask = !title?.length && !description?.length && !done;
    if (isEmptyTask || confirm("Are you sure you want to delete this?")) {
      deleteQuery({ id });
    }
  };

  const dueQuery = useQuery(
    `UPDATE tasks SET due = :due, updated = :now WHERE id = :id`,
  );
  const [dueInput, setDueInput] = useState(due != null ? new Date(due) : null);
  const updateDueDateAndClose = () => {
    if (dueInput?.valueOf() !== (new Date(due)).valueOf()) {
      dueQuery({ id, due: dueInput, now: new Date() });
    }
    onClose();
  };

  const ref = useRef();
  useEffect(() => {
    const onEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        updateDueDateAndClose();
      }
    };
    document.addEventListener("mousedown", onEvent);
    return () => {
      document.removeEventListener("mousedown", onEvent);
    };
  }, [ref, updateDueDateAndClose]);

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
        <Button title="Done" onClick={updateDueDateAndClose} />
      </div>
      <div class="flex flex-col ml-10 mt-2 space-y-2">
        <textarea
          class="min-h-[5em] bg-inherit text-sm"
          placeholder="Add notes"
          value={descriptionInput}
          onInput={(e) => setDescriptionInput(e.target.value)}
        />
        <div class="flex justify-start space-x-4">
          <DateInput value={dueInput} onChange={setDueInput} />
          <Button
            icon={<CheckCircle />}
            title="Checklist"
            onClick={() => alert("TODO")}
            flat
          />
          <Button
            icon={<Archive />}
            title="Archive"
            onClick={() => alert("TODO")}
            flat
          />
          <Button
            icon={<Trash />}
            onClick={onDelete}
            flat
          />
        </div>
      </div>
    </div>
  );
}
