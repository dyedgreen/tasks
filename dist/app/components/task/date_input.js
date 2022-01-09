import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import useDate from "../../../hooks/useDate.js";
import Button from "../button.js";
import {Calendar, Trash} from "../icons.js";
function toDate(string) {
  if (/^\d{4}-\d\d-\d\d$/.test(string)) {
    const [year, month, day] = string.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    return null;
  }
}
function toString(date) {
  if (date != null) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  } else {
    return "";
  }
}
export default function DateInput({value, onChange}) {
  const [showInput, setShowInput] = useState(false);
  const date = useDate(value ?? new Date());
  if (showInput) {
    return /* @__PURE__ */ h("div", {
      class: "flex px-1 rounded space-x-2 text-white bg-slate-500"
    }, /* @__PURE__ */ h("input", {
      class: "bg-inherit",
      type: "date",
      value: "",
      onBlur: (e) => {
        onChange(toDate(e.target.value));
        setShowInput(false);
      }
    }), /* @__PURE__ */ h("button", {
      onClick: () => {
        setShowInput(false);
        onChange(null);
      }
    }, /* @__PURE__ */ h(Trash, null)));
  } else {
    return /* @__PURE__ */ h(Button, {
      icon: /* @__PURE__ */ h(Calendar, {
        class: value != null ? "text-red-500" : "text-slate-500"
      }),
      style: value != null ? "dark:text-slate-200 text-slate-700" : "",
      title: value != null ? date : "Due Date",
      onClick: () => setShowInput(true),
      flat: true
    });
  }
}
