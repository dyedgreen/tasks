import {h} from "../../_snowpack/pkg/preact.js";
export default function Button({icon, title, onClick, flat, style}) {
  return /* @__PURE__ */ h("button", {
    class: `
        flex py-1 space-x-2
        leading-5 text-sm font-bold rounded
      ${flat ? "text-slate-500" : "px-2 dark:bg-slate-300 dark:text-black bg-slate-600 text-white"}
      ${icon != null && !flat ? "pl-1" : ""}
      ${style ?? ""}
      `,
    onClick
  }, icon, /* @__PURE__ */ h("div", {
    class: flat ? "" : ""
  }, title));
}
