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
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
);

export default function SquareCheck({ checked, onChange }) {
  return (
    <button
      class={`p-1 rounded-md dark:hover:bg-gray-700 hover:bg-gray-200 ${
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
