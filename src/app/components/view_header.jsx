import { h } from "preact";
import {
  Archive,
  Beaker,
  Calendar,
  Lightning,
} from "@app/components/icons.jsx";

export default function ViewHeader({ activeView }) {
  let name;
  let icon;
  switch (activeView) {
    case "ideas":
      name = "Ideas";
      icon = <Beaker class="w-6 h-6 text-blue-500" />;
      break;
    case "today":
      name = "Today";
      icon = <Lightning class="w-6 h-6 text-yellow-500" />;
      break;
    case "planned":
      name = "Planned";
      icon = <Calendar class="w-6 h-6 text-red-500" />;
      break;
    case "completed":
      name = "Completed";
      icon = <Archive class="w-6 h-6 text-green-500" />;
      break;
    default:
      return null;
  }
  return (
    <div class="flex w-full items-center space-x-4">
      {icon}
      <h1 class="text-xl font-semibold dark:text-white">{name}</h1>
    </div>
  );
}
