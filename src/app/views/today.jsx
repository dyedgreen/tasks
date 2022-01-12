import { Fragment, h } from "preact";
import { useRows } from "@hooks/useSqlite.js";
import { useToday } from "@hooks/useNow.js";
import { Clock, Lightning } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import EmptyView from "@app/components/empty_view.jsx";

export default function TodayView() {
  const today = useToday();
  const yesterday = new Date(today.valueOf() - 24 * 60 * 60 * 1000);

  const tasksDueToday = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due NOT NULL AND due <= :today AND due > :yesterday AND archived IS NULL
     ORDER BY due DESC`,
    { today, yesterday },
  );
  const tasksDueBefore = useRows(
    `SELECT id, title, done FROM tasks
     WHERE due NOT NULL AND due < :today AND archived IS NULL
     ORDER BY due DESC`,
    { today },
  );

  if (tasksDueToday.length + tasksDueBefore.length) {
    return (
      <>
        {tasksDueToday.map((task) => <Task key={task.id} {...task} />)}
        {tasksDueBefore.length > 0 && (
          <div
            class={`
              flex justify-start items-center space-x-4 text-slate-500
              ${tasksDueToday.length ? "pt-4" : ""}
            `}
          >
            <Clock class="w-6 h-6" />
            <h2 class="
              grow border-t-2 mt-1
              text-sm font-semibold
              dark:border-slate-600 border-slate-300 text-slate-500
            ">
              Due Before Today
            </h2>
          </div>
        )}
        {tasksDueBefore.map((task) => <Task key={task.id} {...task} />)}
      </>
    );
  } else {
    return <EmptyView icon={Lightning} />;
  }
}
