import { createContext, h } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { open } from "@lib/sqlite.js";

const Database = createContext(null);
const TotalChanges = createContext(null);

export function Context({
  database = ":memory:",
  placeholder = null,
  children,
}) {
  const [handle, setHandle] = useState(null);
  const changes = useState(0);

  useEffect(() => {
    const promise = open(database);
    promise.then(setHandle);
    return () => promise.then((handle) => handle.close(true));
  }, []);

  if (handle != null) {
    const withTotalChanges = h(
      TotalChanges.Provider,
      { value: changes },
      children,
    );
    return h(Database.Provider, { value: handle }, withTotalChanges);
  } else {
    return placeholder;
  }
}

export function useRows(query, params) {
  const db = useContext(Database);
  const [totalChanges, _] = useContext(TotalChanges);
  if (db == null) throw new Error("Database handle not initialized.");

  let [stmt, setStmt] = useState(null);
  stmt = stmt ?? db.prepareQuery(query);

  useEffect(() => {
    setStmt(stmt);
    return stmt.finalize;
  }, []);

  const [cache, setCache] = useState({ rows: null, params, totalChanges: NaN });
  const needsUpdate = cache.totalChanges !== totalChanges ||
    cache.params !== params;

  if (needsUpdate) cache.rows = stmt.allEntries(params);
  useEffect(() => {
    if (needsUpdate) setCache({ ...cache });
  }, [totalChanges, params]);

  return cache.rows;
}

export function usePreparedQuery(query) {
  const db = useContext(Database);
  const [totalChanges, setTotalChanges] = useContext(TotalChanges);
  if (db == null) throw new Error("Database handle not initialized.");

  let [stmt, setStmt] = useState(null);
  stmt = stmt ?? db.prepareQuery(query);

  useEffect(() => {
    setStmt(stmt);
    return stmt.finalize;
  }, []);

  return (params) => {
    const rows = stmt.allEntries(params);
    if (db.totalChanges !== totalChanges) setTotalChanges(db.totalChanges);
    return rows;
  };
}
