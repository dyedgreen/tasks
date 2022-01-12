import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { useQuery, useRows } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import Button from "@app/components/button.jsx";
import { Archive, CheckCircle, Trash } from "@app/components/icons.jsx";
import TextInput from "@app/components/text_input.jsx";
import TextArea from "./text_area.jsx";
import DateInput from "./date_input.jsx";
import SquareCheck from "./square_check.jsx";
import ChecklistItem from "./checklist_item.jsx";

export default function Open({ id, onClose }) {
  const [{ title, description, done, due, archived }] = useRows(
    "SELECT * FROM tasks WHERE id = :id",
    { id },
  );
  const checklistItems = useRows(
    "SELECT id, title, done FROM checklist WHERE task = :id ORDER BY id ASC",
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

  const checklistQuery = useQuery(
    "INSERT INTO checklist (task, title, done) VALUES (:id, '', FALSE)",
  );
  const onAddChecklist = () => {
    checklistQuery({ id });
  };

  const archiveQuery = useQuery(
    `UPDATE tasks SET archived = :archived, updated = :now WHERE id = :id`,
  );
  const onArchive = () => {
    const now = new Date();
    archiveQuery({ id, now, archived: archived != null ? null : now });
  };

  const deleteQuery = useQuery(`DELETE FROM tasks WHERE id = :id`);
  const onDelete = () => {
    const isEmptyTask = !title?.length &&
      !description?.length &&
      !done &&
      checklistItems.length === 0;
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
        const sideBar = document.getElementById("sidebar");
        if (!sideBar.contains(event.target)) updateDueDateAndClose();
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
        <TextInput
          class="text-base font-medium mx-4 w-full bg-inherit"
          value={titleInput}
          onChange={setTitleInput}
          placeholder="Untitled To-Do"
        />
        <Button title="Done" onClick={updateDueDateAndClose} />
      </div>
      <div class="flex flex-col ml-10 mt-2 space-y-2">
        <TextArea
          class="h-auto resize-none bg-inherit text-xs font-mono"
          placeholder="Add notes"
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        {checklistItems.map((item) => (
          <ChecklistItem
            key={item.id}
            {...item}
          />
        ))}
        <div class="flex justify-start space-x-4">
          <DateInput value={dueInput} onChange={setDueInput} />
          <Button
            icon={<CheckCircle />}
            title="Checklist"
            onClick={onAddChecklist}
            flat
          />
          <Button
            icon={<Archive />}
            title={archived ? "Un-Archive" : "Archive"}
            onClick={onArchive}
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
