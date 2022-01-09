import {h} from "../../../_snowpack/pkg/preact.js";
import Item from "./item.js";
import {
  Archive,
  Beaker,
  Calendar,
  DocumentDownload,
  Lightning,
  Moon,
  Sun
} from "../icons.js";
import {useActiveView, useDarkMode} from "../../../hooks/useSettings.js";
export default function Sidebar() {
  const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const [activeView, setActiveView] = useActiveView();
  return /* @__PURE__ */ h("navigation", {
    class: "\n      w-40 h-full\n      flex flex-col shrink-0 justify-between p-2\n      dark:bg-slate-900 bg-gray-200 dark:text-white\n    "
  }, /* @__PURE__ */ h("div", {
    class: "space-y-1"
  }, /* @__PURE__ */ h("h1", {
    class: "text-xl font-semibold mt-2 mb-3 px-2"
  }, "Tasks"), /* @__PURE__ */ h(Item, {
    selected: activeView === "ideas",
    onClick: () => setActiveView("ideas"),
    icon: /* @__PURE__ */ h(Beaker, {
      class: "text-blue-500"
    }),
    title: "Ideas"
  }), /* @__PURE__ */ h("div", {
    class: "h-1"
  }), /* @__PURE__ */ h(Item, {
    selected: activeView === "today",
    onClick: () => setActiveView("today"),
    icon: /* @__PURE__ */ h(Lightning, {
      class: "text-yellow-500"
    }),
    title: "Today"
  }), /* @__PURE__ */ h(Item, {
    selected: activeView === "planned",
    onClick: () => setActiveView("planned"),
    icon: /* @__PURE__ */ h(Calendar, {
      class: "text-red-500"
    }),
    title: "Planned"
  }), /* @__PURE__ */ h(Item, {
    selected: activeView === "completed",
    onClick: () => setActiveView("completed"),
    icon: /* @__PURE__ */ h(Archive, {
      class: "text-green-500"
    }),
    title: "Completed"
  })), /* @__PURE__ */ h("div", {
    class: "space-y-1"
  }, /* @__PURE__ */ h(Item, {
    onClick: toggleDarkMode,
    icon: darkMode ? /* @__PURE__ */ h(Sun, null) : /* @__PURE__ */ h(Moon, null),
    title: darkMode ? "Light Mode" : "Dark Mode"
  }), /* @__PURE__ */ h(Item, {
    onClick: () => alert("TODO"),
    icon: /* @__PURE__ */ h(DocumentDownload, null),
    title: "Backup"
  })));
}
