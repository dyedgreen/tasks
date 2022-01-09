import { h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { useToday } from "@hooks/useNow.js";
import Task from "@app/components/task/mod.jsx";

export default function TodayView() {
  const today = useToday();
  const tasksDue = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due NOT NULL AND due >= :today`,
    { today },
  );

  return tasksDue.map((task) => <Task {...task} />);
}
