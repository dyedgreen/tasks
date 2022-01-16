import { h } from "preact";
import { useQuery } from "@hooks/useSqlite.js";
import useDebounced from "@hooks/useDebounced.js";
import { Trash } from "@app/components/icons.jsx";
import TextInput from "@app/components/text_input.jsx";
import Button from "@app/components/button.jsx";
import CircleCheck from "./circle_check.jsx";

const LAST_ITEM_ID = "fd9517608-checklist-last-item-input";

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
      onAddChecklist();
      setTimeout(() => document.getElementById(LAST_ITEM_ID).focus(), 50);
    }
  };

  return (
    <div class="flex space-x-2 items-center px-1 rounded dark:bg-slate-800 bg-slate-200">
      <CircleCheck checked={done} onChange={toggleDone} />
      <TextInput
        id={isLastItem ? LAST_ITEM_ID : undefined}
        class={`h-8 grow text-sm bg-inherit ${
          done
            ? "line-through text-slate-500"
            : ""
        }`}
        value={titleInput}
        onChange={setTitleInput}
        onKeyPress={onEnter}
        placeholder="Add a checklist item"
      />
      <Button onClick={onDelete} icon={<Trash />} flat />
    </div>
  );
}
