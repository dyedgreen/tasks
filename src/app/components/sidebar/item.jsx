import { h } from "preact";

export default function Item({ onClick, icon, title, selected, badge }) {
  return (
    <button
      class={`
        flex justify-center sm:justify-start items-center
        space-x-1 sm:space-x-2 w-full px-2 py-1
        text-sm font-bold rounded
        dark:hover:bg-slate-700 hover:bg-slate-300
        ${selected && "dark:bg-slate-700 bg-slate-300"}
      `}
      onClick={onClick}
    >
      {icon}
      <div class="hidden sm:block text-left leading-tight">{title}</div>
      {badge != null && (
        <div class="sm:grow text-slate-500 text-right">
          {badge}
        </div>
      )}
    </button>
  );
}
