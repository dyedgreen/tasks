import { h } from "preact";

export default function EmptyView({ icon }) {
  const Icon = icon;
  return (
    <div class="
      w-full h-2/3 flex flex-col justify-center items-center
      dark:text-slate-600 text-slate-400
      ">
      <Icon class="w-12 h-12" />
      <h2 class="mt-4 text-sm text-center">There are no To-Do's to show</h2>
    </div>
  );
}
