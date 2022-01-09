import {h} from "../../_snowpack/pkg/preact.js";
import {
  Archive,
  Beaker,
  Calendar,
  Lightning
} from "./icons.js";
export default function ViewHeader({activeView}) {
  let name;
  let icon;
  switch (activeView) {
    case "ideas":
      name = "Ideas";
      icon = /* @__PURE__ */ h(Beaker, {
        class: "w-6 h-6 text-blue-500"
      });
      break;
    case "today":
      name = "Today";
      icon = /* @__PURE__ */ h(Lightning, {
        class: "w-6 h-6 text-yellow-500"
      });
      break;
    case "planned":
      name = "Planned";
      icon = /* @__PURE__ */ h(Calendar, {
        class: "w-6 h-6 text-red-500"
      });
      break;
    case "completed":
      name = "Completed";
      icon = /* @__PURE__ */ h(Archive, {
        class: "w-6 h-6 text-green-500"
      });
      break;
    default:
      return null;
  }
  return /* @__PURE__ */ h("div", {
    class: "flex w-full items-center space-x-4"
  }, icon, /* @__PURE__ */ h("h1", {
    class: "text-xl font-semibold dark:text-white"
  }, name));
}
