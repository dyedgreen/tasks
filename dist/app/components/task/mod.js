import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import Button from "../button.js";
import {CheckCircle} from "../icons.js";
import DateInput from "./date_input.js";
import SquareCheck from "./square_check.js";
function Closed({id, title, _done, onOpen}) {
  const [done, setDone] = useState(false);
  return /* @__PURE__ */ h("div", {
    class: "flex flex-row items-center w-full"
  }, /* @__PURE__ */ h(SquareCheck, {
    checked: done,
    onChange: setDone
  }), /* @__PURE__ */ h("button", {
    class: "text-sm font-medium pl-4 dark:text-white",
    onClick: onOpen
  }, title != null && title.length > 0 ? title : /* @__PURE__ */ h("span", {
    class: "dark:text-gray-600 text-gray-400"
  }, "(Untitled To-Do)")));
}
function ChecklistItem({id, title, done}) {
  return;
}
function Open({id, onClose}) {
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState("test");
  const [date, setDate] = useState(null);
  return /* @__PURE__ */ h("div", {
    class: "\n      flex flex-col w-full\n      p-2 -mx-2 shadow-lg rounded-md\n      dark:text-white dark:bg-slate-900 bg-slate-50\n    "
  }, /* @__PURE__ */ h("div", {
    class: "flex flex-row items-center w-full"
  }, /* @__PURE__ */ h(SquareCheck, {
    checked: done,
    onChange: setDone
  }), /* @__PURE__ */ h("input", {
    class: "text-base font-medium mx-4 w-full bg-inherit",
    value: title,
    onChange: (e) => setTitle(e.target.value),
    placeholder: "Untitled To-Do"
  }), /* @__PURE__ */ h(Button, {
    title: "Done",
    onClick: onClose
  })), /* @__PURE__ */ h("div", {
    class: "flex flex-col ml-10 mt-2 space-y-2"
  }, /* @__PURE__ */ h("textarea", {
    class: "min-h-[5em] bg-inherit text-sm",
    placeholder: "Add notes"
  }, "This is a test"), /* @__PURE__ */ h("div", {
    class: "flex justify-start space-x-4"
  }, /* @__PURE__ */ h(DateInput, {
    value: date,
    onChange: setDate
  }), /* @__PURE__ */ h(Button, {
    icon: /* @__PURE__ */ h(CheckCircle, null),
    title: "Checklist",
    flat: true
  }))));
}
export default function Task({id, title, done}) {
  const [open, setOpen] = useState(false);
  if (open) {
    return /* @__PURE__ */ h(Open, {
      id,
      onClose: () => setOpen(false)
    });
  } else {
    return /* @__PURE__ */ h(Closed, {
      id,
      title,
      done,
      onOpen: () => setOpen(true)
    });
  }
}
