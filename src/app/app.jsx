import { h } from "preact";
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";
import { useEffect } from "preact/hooks";
import { Context } from "@hooks/useSqlite.js";
import Sidebar from "@app/components/sidebar/mod.jsx";
import ViewHeader from "@app/components/view_header.jsx";
import Ideas from "@app/views/ideas.jsx";
import Today from "@app/views/today.jsx";
import schema from "@app/schema.js";

function Navigation() {
  const [darkMode] = useDarkMode();
  useEffect(() => {
    document.querySelector("html").classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [activeView] = useActiveView();

  let viewBody;
  switch (activeView) {
    case "ideas":
      viewBody = <Ideas />;
      break;
    case "today":
      viewBody = <Today />;
      break;
    default:
      viewBody = null;
      break;
  }

  return (
    <div class="flex w-full h-screen">
      <Sidebar />
      <div class="p-8 w-full space-y-4">
        <ViewHeader activeView={activeView} />
        {viewBody}
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
