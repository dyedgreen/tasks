import { Fragment, h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { useToday } from "@hooks/useNow.js";
import { Calendar } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import DateHeader from "@app/components/date_header.js";
import EmptyView from "@app/components/empty_view.jsx";

export default function Planned() {
  const today = useToday();
  const plannedTasks = useRows(
    `SELECT id, title, done, due FROM tasks
     WHERE due NOT NULL AND due > :today AND archived IS NULL
     ORDER BY due ASC`,
    { today },
  );

  if (plannedTasks.length) {
    let lastDate = null;
    return plannedTasks.map((task) => {
      const due = new Date(task.due);
      if (lastDate == null || due.getDate() !== lastDate.getDate()) {
        const isFirst = lastDate == null;
        lastDate = due;
        return (
          <>
            {!isFirst && <div class="w-full h-2" />}
            <DateHeader date={due} />
            <Task key={task.id} {...task} />
          </>
        );
      } else {
        return <Task key={task.id} {...task} />;
      }
    });
  } else {
    return <EmptyView icon={Calendar} />;
  }
}
