import { h } from "preact";
import { useEffect } from "preact/hooks";
import { Context } from "@hooks/useSqlite.js";
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";
import schema from "@app/schema.js";
import Sidebar from "@app/components/sidebar/mod.jsx";
import ViewHeader from "@app/components/view_header.jsx";

import Task from "@app/components/task/mod.jsx";

function Navigation() {
  const [darkMode] = useDarkMode();
  useEffect(() => {
    document.querySelector("html").classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [activeView] = useActiveView();

  return (
    <div class="flex w-full h-screen">
      <Sidebar />
      <div class="p-8 w-full space-y-4">
        <ViewHeader activeView={activeView} />
        <Task id={0} title="Tell babe to go to Maven" />
        <Task id={1} title="" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Context database="test.sqlite" schema={schema}>
      <Navigation />
    </Context>
  );
}
