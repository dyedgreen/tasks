import { h } from "preact";

export default function Button({ icon, title, onClick, flat, style }) {
  return (
    <button
      class={`
        flex py-1 space-x-2 items-center
        leading-5 text-sm font-bold rounded
      ${
        flat
          ? "text-slate-500"
          : "px-2 dark:bg-slate-300 dark:text-black bg-slate-600 text-white"
      }
      ${icon != null && !flat ? "pl-1" : ""}
      ${style ?? ""}
      `}
      onClick={onClick}
    >
      {icon}
      <div class={flat ? "" : ""}>{title}</div>
    </button>
  );
}
