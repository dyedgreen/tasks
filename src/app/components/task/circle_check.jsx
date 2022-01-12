import { h } from "preact";

const CHECKED = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const UNCHECKED = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

export default function CircleCheck({ checked, onChange }) {
  return (
    <button
      class={`h-6 w-6 p-1 rounded-md dark:hover:bg-gray-700 hover:bg-slate-300 ${
        checked
          ? "dark:text-blue-400 text-blue-500"
          : "dark:text-gray-400 text-gray-500"
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked ? CHECKED : UNCHECKED}
    </button>
  );
}
