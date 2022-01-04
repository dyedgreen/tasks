import { h } from "preact";
import schema from "@app/schema.js";
import { Context, useQuery, useRows } from "@hooks/useSqlite.js";

function RowList() {
  const rows = useRows("SELECT * FROM test");
  return rows.map(({ id, title }) => <li key={id}>{title}</li>);
}

function RenderData() {
  const [{ total }] = useRows("SELECT COUNT(*) as total FROM test");
  const addRow = useQuery("INSERT INTO test (title) VALUES (:title)");
  return (
    <ul>
      <RowList />
      <button
        onClick={() => {
          addRow({ title: `Row #${total + 1}` });
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
