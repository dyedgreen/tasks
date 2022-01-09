import { h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import Task from "@app/components/task/mod.jsx";

export default function TodayView() {
  const taskIdeas = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due IS NULL
     ORDER BY created DESC`,
  );

  return taskIdeas.map((task) => <Task key={task.id} {...task} />);
}
