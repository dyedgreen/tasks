import { h } from "preact";
import { useActiveView, useDarkMode } from "@hooks/useSettings.js";
import { useEffect } from "preact/hooks";
import { Context, SqliteErrorBoundary } from "@hooks/useSqlite.js";
import Sidebar from "@app/components/sidebar/mod.jsx";
import ViewHeader from "@app/components/view_header.jsx";
import Ideas from "@app/views/ideas.jsx";
import Today from "@app/views/today.jsx";
import Planned from "@app/views/planned.jsx";
import Archive from "@app/views/archive.jsx";
import Search from "@app/views/search.jsx";
import Error from "@app/views/error.jsx";
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
    case "planned":
      viewBody = <Planned />;
      break;
    case "archive":
      viewBody = <Archive />;
      break;
    case "search":
      viewBody = <Search />;
      break;
    default:
      viewBody = null;
      break;
  }

  return (
    <div class="flex w-full h-full">
      <Sidebar />
      <div class="p-8 w-full overflow-y-auto">
        <div class="space-y-4 max-w-4xl mx-auto">
          <ViewHeader activeView={activeView} />
          {viewBody}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SqliteErrorBoundary fallback={Error}>
      <Context database="tasks.sqlite" schema={schema}>
        <Navigation />
      </Context>
    </SqliteErrorBoundary>
  );
}
