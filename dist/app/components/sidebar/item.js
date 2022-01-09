import {h} from "../../../_snowpack/pkg/preact.js";
export default function Item({onClick, icon, title, selected}) {
  return /* @__PURE__ */ h("button", {
    class: `
        flex justify-start items-center space-x-2 w-full px-2 py-1
        text-sm font-bold rounded
        dark:hover:bg-slate-700 hover:bg-slate-300
        ${selected && "dark:bg-slate-700 bg-slate-300"}
      `,
    onClick
  }, icon, /* @__PURE__ */ h("span", {
    class: "block h-full leading-none"
  }, title));
}
