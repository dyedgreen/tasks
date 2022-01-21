import { h } from "preact";
import { useQuery } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import { Trash } from "@app/components/icons.jsx";
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
  const toggleDone = () => doneQuery({ id, done: !done });

  const titleQuery = useQuery(
    `UPDATE checklist SET title = :title WHERE id = :id`,
  );
  const [titleInput, setTitleInput] = useDebounced(
    title,
    (title) => titleQuery({ id, title }),
  );

  const deleteQuery = useQuery(
    `DELETE FROM checklist WHERE id = :id`,
  );
  const onDelete = () => {
    const itemIsEmpty = title.length === 0;
    if (itemIsEmpty || confirm("Are you sure you want to delete this?")) {
      deleteQuery({ id });
    }
  };

  const onEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onAddChecklist();
      requestAnimationFrame(() =>
        document.getElementById(LAST_ITEM_ID).focus()
      );
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
        onKeyPress={onEnter}
        placeholder="Add a checklist item"
      />
      <Button onClick={onDelete} icon={<Trash />} flat />
    </div>
  );
}
