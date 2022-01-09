import { h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { useToday } from "@hooks/useNow.js";
import { Lightning } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import EmptyView from "@app/components/empty_view.jsx";

export default function TodayView() {
  const today = useToday();
  const tasksDue = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due NOT NULL AND due <= :today AND archived IS NULL
     ORDER BY due ASC`,
    { today },
  );

  if (tasksDue.length) {
    return tasksDue.map((task) => <Task key={task.id} {...task} />);
  } else {
    return <EmptyView icon={Lightning} />;
  }
}
