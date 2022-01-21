import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { useRows } from "@hooks/useSqlite.js";
import { Archive, Search } from "@app/components/icons.jsx";
import Task from "@app/components/task/mod.jsx";
import TextInput from "@app/components/text_input.jsx";
import EmptyView from "@app/components/empty_view.jsx";
import IconHeader from "@app/components/icon_header.jsx";

export default function SearchView() {
  const [query, setQuery] = useState("");

  const matchingTasks = useRows(
    `SELECT id, title, done FROM tasks
     WHERE (instr(lower(title), lower(:query)) OR instr(lower(description), lower(:query)))
     AND archived IS NULL AND :query <> ''
     ORDER BY created DESC`,
    { query },
  );
  const matchingArchivedTasks = useRows(
    `SELECT id, title, done FROM tasks
     WHERE (instr(lower(title), lower(:query)) OR instr(lower(description), lower(:query)))
     AND archived NOT NULL AND :query <> ''
     ORDER BY created DESC`,
    { query },
  );

  let results = null;
  if (matchingTasks.length + matchingArchivedTasks.length) {
    results = (
      <>
        {matchingTasks.map((task) => <Task key={task.id} {...task} />)}
        {matchingArchivedTasks.length > 0 && (
          <IconHeader
            icon={Archive}
            title="Archived"
            style={matchingTasks.length ? "pt-4" : ""}
          />
        )}
        {matchingArchivedTasks.map((task) => <Task key={task.id} {...task} />)}
      </>
    );
  } else {
    results = <EmptyView icon={Search} />;
  }

  return (
    <>
      <TextInput
        class="
          w-full p-2 rounded font-semibold
          dark:bg-slate-700 bg-slate-200 dark:text-white
        "
        value={query}
        onChange={setQuery}
        placeholder="Search for To-Do's ..."
      />
      {results}
    </>
  );
}
