import {h} from "../_snowpack/pkg/preact.js";
import {useEffect} from "../_snowpack/pkg/preact/hooks.js";
import {Context} from "../hooks/useSqlite.js";
import {useActiveView, useDarkMode} from "../hooks/useSettings.js";
import schema from "./schema.js";
import Sidebar from "./components/sidebar/mod.js";
import ViewHeader from "./components/view_header.js";
import Task from "./components/task/mod.js";
function Navigation() {
  const [darkMode] = useDarkMode();
  useEffect(() => {
    document.querySelector("html").classList.toggle("dark", darkMode);
  }, [darkMode]);
  const [activeView] = useActiveView();
  return /* @__PURE__ */ h("div", {
    class: "flex w-full h-screen"
  }, /* @__PURE__ */ h(Sidebar, null), /* @__PURE__ */ h("div", {
    class: "p-8 w-full space-y-4"
  }, /* @__PURE__ */ h(ViewHeader, {
    activeView
  }), /* @__PURE__ */ h(Task, {
    id: 0,
    title: "Tell babe to go to Maven"
  }), /* @__PURE__ */ h(Task, {
    id: 1,
    title: ""
  })));
}
export default function App() {
  return /* @__PURE__ */ h(Context, {
    database: "test.sqlite",
    schema
  }, /* @__PURE__ */ h(Navigation, null));
}
