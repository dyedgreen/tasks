import {Fragment, h} from "../../_snowpack/pkg/preact.js";
import {Adjustment, Archive, Cube} from "../components/icons.js";
import Button from "../components/button.js";
export default function Space({id}) {
  return /* @__PURE__ */ h(Fragment, null, /* @__PURE__ */ h("div", {
    class: "flex flex-col sm:flex-row w-full items-center justify-between"
  }, /* @__PURE__ */ h("div", {
    class: "flex space-x-4 items-center"
  }, /* @__PURE__ */ h(Cube, {
    class: "w-6 h-6 text-slate-500"
  }), /* @__PURE__ */ h("h1", {
    class: "text-xl font-semibold dark:text-white"
  }, "Untitled Space")), /* @__PURE__ */ h("div", {
    class: "flex space-x-4 items-center"
  }, /* @__PURE__ */ h(Button, {
    icon: /* @__PURE__ */ h(Adjustment, null),
    title: "Space Settings",
    onClick: () => {
    },
    flat: true
  }), /* @__PURE__ */ h(Button, {
    icon: /* @__PURE__ */ h(Archive, null),
    title: "Archive Completed",
    onClick: () => {
    },
    flat: true
  }))));
}
