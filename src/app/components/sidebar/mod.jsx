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
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [activeView, setActiveView] = useActiveView();

  return (
    <navigation class="
      w-40 h-full
      flex flex-col justify-between p-2
      dark:bg-slate-900 bg-gray-200 dark:text-white text-gray-900
    ">
      <div class="space-y-1">
        <h1 class="text-xl font-semibold mt-2 mb-3 px-2">Tasks</h1>
        <Item
          selected={activeView === "ideas"}
          onClick={() => setActiveView("ideas")}
          icon={<Beaker class="text-blue-500" />}
          title="Ideas"
        />
        <div class="h-1" />
        <Item
          selected={activeView === "today"}
          onClick={() => setActiveView("today")}
          icon={<Lightning class="text-yellow-500" />}
          title="Today"
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
