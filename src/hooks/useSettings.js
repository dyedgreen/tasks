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
