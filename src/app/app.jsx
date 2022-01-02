import { h } from "preact";
import { Context, useQuery, useRows } from "@hooks/useSqlite.js";

const schema = [
  "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)",
];

function RenderData() {
  const rows = useRows("SELECT * FROM test");
  const addRow = useQuery("INSERT INTO test (title) VALUES (:title)");

  return (
    <ul>
      {rows.map(({ id, title }) => <li key={id}>{title}</li>)}
      <button
        onClick={() => {
          addRow({ title: `Row #${rows.length + 1}` });
        }}
      >
        Add Row
      </button>
    </ul>
  );
}

export default function App() {
  return (
    <Context database="test.sqlite" schema={schema}>
      <h1>Hello Stacey!</h1>
      <RenderData />
    </Context>
  );
}
