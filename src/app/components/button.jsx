import { h } from "preact";

export default function Button({ title, onClick }) {
  return (
    <button
      class="
        px-2 py-1
        text-sm font-bold rounded
        dark:bg-slate-300 dark:text-black bg-slate-600 text-white
      "
      onClick={onClick}
    >
      {title}
    </button>
  );
}
