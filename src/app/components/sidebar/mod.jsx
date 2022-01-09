import { h } from "preact";
import Item from "./item.jsx";
import {
  Archive,
  Beaker,
  Calendar,
  DocumentDownload,
  Lightning,
  Moon,
  Sun,
} from "@app/components/icons.jsx";
import { useToday } from "@hooks/useNow.js";
import { useRows } from "@hooks/useSqlite.js";
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [activeView, setActiveView] = useActiveView();

  const today = useToday();
  const [{ dueTodayCount }] = useRows(
    `SELECT COUNT(*) as dueTodayCount FROM tasks
     WHERE due NOT NULL AND due <= :today AND done IS NULL`,
    { today },
  );

  const [{ ideasCount }] = useRows(
    `SELECT COUNT(*) as ideasCount FROM tasks
     WHERE due IS NULL AND done IS NULL`,
  );

  return (
    <navigation class="
      w-40 h-full
      flex flex-col shrink-0 justify-between p-2
      dark:bg-slate-900 bg-gray-200 dark:text-white
    ">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold mt-2 mb-3 px-2">Tasks</h1>
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
          selected={activeView === "completed"}
          onClick={() => setActiveView("completed")}
          icon={<Archive class="text-green-500" />}
          title="Completed"
        />
      </div>
      <div class="space-y-1">
        <Item
          onClick={toggleDarkMode}
          icon={darkMode ? <Sun /> : <Moon />}
          title={darkMode ? "Light Mode" : "Dark Mode"}
        />
        <Item
          onClick={() => alert("TODO")}
          icon={<DocumentDownload />}
          title="Backup"
        />
      </div>
    </navigation>
  );
}
