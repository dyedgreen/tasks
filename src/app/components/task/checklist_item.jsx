import { h } from "preact";
import { useQuery } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import { DragHandle, Trash } from "@app/components/icons.jsx";
import Button from "@app/components/button.jsx";
import TextArea from "./text_area.jsx";
import CircleCheck from "./circle_check.jsx";

export const LAST_ITEM_ID = "fd9517608-checklist-last-item-input";

export default function ChecklistItem({
  id,
  title,
  done,
  isLastItem,
  onAddChecklist,
}) {
  const doneQuery = useQuery(
    `UPDATE checklist SET done = :done WHERE id = :id`,
  );
  const toggleDone = () => {
    console.log(id);
    doneQuery({ id, done: !done });
  };

  const titleQuery = useQuery(
    `UPDATE checklist SET title = :title WHERE id = :id`,
  );
  const [titleInput, setTitleInput] = useDebounced(
    title,
    (title) => titleQuery({ id, title: title.replace(/\s+/g, " ").trim() }),
  );

  const itemIsEmpty = titleInput.length === 0;
  const deleteQuery = useQuery(
    `DELETE FROM checklist WHERE id = :id`,
  );
  const onDelete = () => {
    console.log(id);
    if (itemIsEmpty || confirm("Are you sure you want to delete this?")) {
      deleteQuery({ id });
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      // on enter
      event.preventDefault();
      onAddChecklist();
      requestAnimationFrame(() =>
        document.getElementById(LAST_ITEM_ID).focus()
      );
    } else if (event.keyCode === 8) {
      // on backspace
      if (itemIsEmpty) {
        onDelete();
        requestAnimationFrame(() =>
          document.getElementById(LAST_ITEM_ID)?.focus()
        );
      }
    }
  };

  return (
    <div class="flex space-x-2 items-center px-1 rounded dark:bg-slate-800 bg-slate-200">
      <CircleCheck checked={done} onChange={toggleDone} />
      <TextArea
        id={isLastItem ? LAST_ITEM_ID : undefined}
        class={`py-1.5 grow text-sm bg-inherit resize-none ${
          done
            ? "line-through text-slate-500"
            : ""
        }`}
        minHeight="2rem"
        value={titleInput}
        onChange={(text) => setTitleInput(text.replace(/\n/g, ""))}
        onKeyDown={onKeyDown}
        placeholder="Add a checklist item"
      />
      <Button id="reorder" onClick={() => {}} icon={<DragHandle />} flat />
    </div>
  );
}
