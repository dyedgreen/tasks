import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { open, read, write } from "@lib/sqlite.js";

const Database = createContext(null);
const TotalChanges = createContext(null);

export function Context({
  database = ":memory:",
  schema = [],
  placeholder = null,
  children,
}) {
  const [handle, setHandle] = useState(null);
  const changes = useState(0);

  useEffect(() => {
    const promise = open(database);
    promise.then((handle) => {
      for (const query of schema) handle.query(query);
      setHandle(handle);
    });
    return () => promise.then((handle) => handle.close(true));
  }, []);

  if (handle != null) {
    const withTotalChanges = h(
      TotalChanges.Provider,
      { value: changes },
      children,
    );
    return h(
      Database.Provider,
      { value: { handle, database } },
      withTotalChanges,
    );
  } else {
    return placeholder;
  }
}

export function useRows(query, params) {
  const { handle: db } = useContext(Database);
  const [totalChanges, _] = useContext(TotalChanges);
  if (db == null) throw new Error("Database handle not initialized.");

  let [stmt, setStmt] = useState(null);
  stmt = stmt ?? db.prepareQuery(query);

  useEffect(() => {
    setStmt(stmt);
    return () => stmt.finalize();
  }, []);

  const [cache, setCache] = useState({ rows: null, params, totalChanges: NaN });
  const needsUpdate = cache.totalChanges !== totalChanges ||
    cache.params !== params;

  // We don't set total changes here, to avoid the possibility
  // of accidentally introducing an infinite loop. (And really,
  // the queries provided to this function should not have any
  // side-effects.)
  if (needsUpdate) cache.rows = stmt.allEntries(params);
  useEffect(() => {
    if (needsUpdate) setCache({ ...cache, params, totalChanges });
  }, [totalChanges, params]);

  return cache.rows;
}

export function useQuery(query) {
  const { handle: db } = useContext(Database);
  const [totalChanges, setTotalChanges] = useContext(TotalChanges);
  if (db == null) throw new Error("Database handle not initialized.");

  let [stmt, setStmt] = useState(null);
  stmt = stmt ?? db.prepareQuery(query);

  useEffect(() => {
    setStmt(stmt);
    return () => stmt.finalize();
  }, []);

  return (params) => {
    const rows = stmt.allEntries(params);
    if (db.totalChanges !== totalChanges) setTotalChanges(db.totalChanges);
    return rows;
  };
}

export function useDownload(filename) {
  const { database } = useContext(Database);
  return async () => {
    const fileContents = await read(database);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([fileContents]));
    link.download = filename ?? database;
    link.click();
  };
}

export function useImportFile() {
  const { database } = useContext(Database);
  return () => {
    const input = document.createElement("input");
    input.style = "display: none";
    input.type = "file";
    input.accept = ".sqlite";
    input.addEventListener("change", async function () {
      const buffer = await input.files[0].arrayBuffer();
      await write(database, new Uint8Array(buffer));
      location.reload(); // maybe find a nicer way to close + reopen
    });
    document.querySelector("html").appendChild(input);
    input.click();
  };
}
