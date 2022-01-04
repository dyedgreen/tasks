const schema = [
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value
  ) WITHOUT ROWID`,
  `CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT,
    due         DATETIMETEXT,
    deadline    DATETIMETEXT,
    done        DATETIMETEXT,

    created     DATETIMETEXT NOT NULL,
    updated     DATETIMETEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS subtasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    task        INTEGER NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    done        BOOLEAN
  )`,
];

export default schema;
