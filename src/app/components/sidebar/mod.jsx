import { h } from "preact";
import Item from "./item.jsx";
import {
  Archive,
  Beaker,
  Calendar,
  Cube,
  DocumentDownload,
  Lightning,
  Moon,
  Plus,
  Refresh,
  Sun,
} from "@app/components/icons.jsx";
import { useToday } from "@hooks/useNow.js";
import { useDownload, useImportFile, useRows } from "@hooks/useSqlite.js";
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [activeView, setActiveView] = useActiveView();

  const today = useToday();
  const [{ dueTodayCount }] = useRows(
    `SELECT COUNT(*) as dueTodayCount FROM tasks
     WHERE due NOT NULL AND due <= :today AND done IS NULL AND archived IS NULL`,
    { today },
  );

  const [{ ideasCount }] = useRows(
    `SELECT COUNT(*) as ideasCount FROM tasks
     WHERE due IS NULL AND done IS NULL AND archived IS NULL`,
  );

  const pad = (str) => str.toString().length > 1 ? str : `0${str}`;
  const downloadBackup = useDownload(
    `tasks-backup-${today.getFullYear()}-${pad(today.getMonth() + 1)}-${
      pad(today.getDate())
    }.sqlite`,
  );

  const restoreBackup = useImportFile();

  return (
    <navigation
      id="sidebar"
      class="
      h-full sm:w-40
      flex flex-col shrink-0 justify-between p-2
      dark:bg-slate-900 bg-gray-200 dark:text-white
    "
    >
      <div class="space-y-1">
        <h1 class="sm:text-xl font-semibold mt-2 mb-3 px-2">Tasks</h1>
        <Item
          selected={activeView === "ideas"}
          onClick={() => setActiveView("ideas")}
          icon={<Beaker class="text-blue-500" />}
          title="Ideas"
          badge={ideasCount > 0 ? ideasCount : null}
        />
        <div class="h-1" />
        <Item
          selected={activeView === "today"}
          onClick={() => setActiveView("today")}
          icon={<Lightning class="text-yellow-500" />}
          title="Today"
          badge={dueTodayCount > 0 ? dueTodayCount : null}
        />
        <Item
          selected={activeView === "planned"}
          onClick={() => setActiveView("planned")}
          icon={<Calendar class="text-red-500" />}
          title="Planned"
        />
        <Item
          selected={activeView === "archive"}
          onClick={() => setActiveView("archive")}
          icon={<Archive class="text-green-500" />}
          title="Archive"
        />
      </div>
      <div class="space-y-1">
        <Item
          onClick={downloadBackup}
          icon={<DocumentDownload />}
          title="Backup"
        />
        <Item
          onClick={restoreBackup}
          icon={<Refresh />}
          title="Restore"
        />
        <Item
          onClick={toggleDarkMode}
          icon={darkMode ? <Sun /> : <Moon />}
          title={darkMode ? "Lights On" : "Lights Off"}
        />
      </div>
    </navigation>
  );
}
