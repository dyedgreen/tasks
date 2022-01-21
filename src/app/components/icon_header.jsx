import { h } from "preact";

export default function DateHeader({ icon, title, style }) {
  const Icon = icon;
  return (
    <h1
      class={`
        flex justify-start items-center space-x-4 text-slate-500
        ${style}
      `}
    >
      <Icon class="w-6 h-6" />
      <div class="
        grow border-t-2 mt-1
        text-sm font-semibold
        dark:border-slate-600 border-slate-300 text-slate-500
      ">
        {title}
      </div>
    </h1>
  );
}
