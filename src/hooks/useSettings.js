import { useQuery, useRows } from "./useSqlite.js";

export default function useSettings() {
  const rows = useRows("SELECT key, value FROM settings");
  const query = useQuery(
    `INSERT INTO settings (key, value)
     VALUES (:key, :value)
     ON CONFLICT (key) DO UPDATE SET value = :value WHERE key = :key`,
  );

  const settings = {};
  for (const { key, value } of rows) {
    settings[key] = value;
  }

  return [settings, (key, value) => query({ key, value })];
}

/** Determine if the ui should be rendered with a dark appearance. */
export function useDarkMode() {
  const [{ darkmode }, set] = useSettings();
  return [
    darkmode != null ? !!darkmode : false,
    (dark) => set("darkmode", !!dark),
  ];
}

/** The currently active top level view. */
export function useActiveView() {
  const [{ activeview }, set] = useSettings();
  return [
    typeof activeview === "string" ? activeview : "today",
    (viewName) => set("activeview", viewName.toString()),
  ];
}

/** The current search term. */
export function useSearchQuery() {
  const [{ searchquery }, set] = useSettings();
  return [
    typeof searchquery === "string" ? searchquery : "",
    (query) => set("searchquery", query.toString()),
  ];
}
