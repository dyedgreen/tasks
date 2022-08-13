import { h } from "preact";
import { useState } from "preact/hooks";
import { useQuery } from "@hooks/useSqlite.js";
import Details from "./details.jsx";
import SquareCheck from "./square_check.jsx";

function Closed({ id, title, done, onOpen }) {
  const doneQuery = useQuery(
    `UPDATE tasks SET done = :done, updated = :now WHERE id = :id`,
  );
  const setDone = (isDone) => {
    const now = new Date();
    doneQuery({ id, done: isDone ? now : null, now });
  };

  return (
    <div class="flex flex-row items-center w-full">
      <SquareCheck checked={done} onChange={setDone} />
      <button
        id={`open-button-task-${id}`}
        class={`ml-2 -my-2 p-2 flex-grow
          text-sm text-left font-medium
          rounded-md dark:hover:bg-gray-700 hover:bg-gray-200 ${
          title?.length > 0 && !done
            ? "dark:text-white"
            : "dark:text-gray-600 text-gray-400"
        } ${done ? "line-through" : ""}`}
        onClick={onOpen}
      >
        {title?.length > 0 ? title : "Untitled To-Do"}
      </button>
    </div>
  );
}

export default function Task({ id, title, done }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <Details
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
