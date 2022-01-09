import { Fragment, h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { Archive as ArchiveIcon } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import DateHeader from "@app/components/date_header.js";
import EmptyView from "@app/components/empty_view.jsx";

export default function Archive() {
  const plannedTasks = useRows(
    `SELECT id, title, done, archived FROM tasks
     WHERE archived NOT NULL
     ORDER BY archived DESC
     LIMIT 500`,
  );

  if (plannedTasks.length) {
    let lastDate = null;
    return plannedTasks.map((task) => {
      if (
        lastDate == null ||
        new Date(task.archived).valueOf() > lastDate + 24 * 60 * 60 * 1000
      ) {
        const isFirst = lastDate == null;
        lastDate = new Date(task.archived).valueOf();
        return (
          <>
            {!isFirst && <div class="w-full h-2" />}
            <DateHeader date={new Date(task.archived)} />
            <Task key={task.id} {...task} />
          </>
        );
      } else {
        return <Task key={task.id} {...task} />;
      }
    });
  } else {
    return <EmptyView icon={ArchiveIcon} />;
  }
}
