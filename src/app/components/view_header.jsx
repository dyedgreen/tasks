import { h } from "preact";
import { useQuery } from "@hooks/useSqlite.js";
import {
  Archive,
  Beaker,
  Calendar,
  Lightning,
  Plus,
} from "@app/components/icons.jsx";
import Button from "@app/components/button.jsx";

export default function ViewHeader({ activeView }) {
  let name;
  let icon;
  switch (activeView) {
    case "ideas":
      name = "Ideas";
      icon = <Beaker class="w-6 h-6 text-blue-500" />;
      break;
    case "today":
      name = "Today";
      icon = <Lightning class="w-6 h-6 text-yellow-500" />;
      break;
    case "planned":
      name = "Planned";
      icon = <Calendar class="w-6 h-6 text-red-500" />;
      break;
    case "archive":
      name = "Archive";
      icon = <Archive class="w-6 h-6 text-green-500" />;
      break;
    default:
      return null;
  }

  const addTaskQuery = useQuery(
    `INSERT INTO tasks (title, due, created, updated)
     VALUES (:title, :due, :created, :updated)`,
  );
  const addEmptyTask = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let due;
    switch (activeView) {
      case "today":
        due = today;
        break;
      case "planned":
        // due tomorrow
        due = new Date(today.valueOf() + 24 * 60 * 60 * 1000);
        break;
      default:
        due = null;
        break;
    }
    addTaskQuery({ title: "", due, created: now, updated: now });
  };

  return (
    <div class="flex w-full items-center justify-between">
      <div class="flex space-x-4 items-center">
        {icon}
        <h1 class="text-xl font-semibold dark:text-white">{name}</h1>
      </div>
      <div class="flex space-x-4 items-center">
        {activeView != "archive" && (
          <Button
            icon={<Plus />}
            title="New To-Do"
            onClick={addEmptyTask}
            flat
          />
        )}
        {activeView != "archive" && (
          <Button icon={<Archive />} title="Archive Completed" flat />
        )}
      </div>
    </div>
  );
}
