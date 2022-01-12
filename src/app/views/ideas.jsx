import { h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { Beaker } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import EmptyView from "@app/components/empty_view.jsx";

export default function TodayView() {
  const taskIdeas = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due IS NULL AND archived IS NULL
     ORDER BY created DESC`,
  );

  if (taskIdeas.length) {
    return taskIdeas.map((task) => <Task key={task.id} {...task} />);
  } else {
    return <EmptyView icon={Beaker} />;
  }
}
