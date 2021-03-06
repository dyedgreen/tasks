const schema = [
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value
  )`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    due         DATETIMETEXT,
    done        DATETIMETEXT,
    archived    DATETIMETEXT,

    created     DATETIMETEXT NOT NULL,
    updated     DATETIMETEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS checklist (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    task        INTEGER NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    done        BOOLEAN
  )`,
];

export default schema;
