import { h } from "preact";
import { useState } from "preact/hooks";
import SquareCheck from "./square_check.jsx";

function Closed({ title, onOpen }) {
  // FIXME: use task itself ...
  const [done, setDone] = useState(false);

  return (
    <div class="flex flex-row items-center w-full">
      <SquareCheck checked={done} onChange={setDone} />
      <button class="text-sm font-medium pl-4 dark:text-white" onClick={onOpen}>
        {title}
      </button>
    </div>
  );
}

function Open({ title, onClose }) {
  // FIXME: use task itself ...
  const [done, setDone] = useState(false);

  return (
    <div class="
      flex flex-col w-full
      p-2 -mx-2
      shadow-md rounded-md
    ">
      <div class="flex flex-row items-center w-full">
        <SquareCheck checked={done} onChange={setDone} />
        <h1 class="text-sm font-medium pl-4 dark:text-white w-full">
          {title} TODO make input
        </h1>
        <button
          class="text-sm font-medium pl-4 dark:text-white"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default function Task(props) {
  const [open, setOpen] = useState(false);
  return open
    ? <Open {...props} onClose={() => setOpen(false)} />
    : <Closed {...props} onOpen={() => setOpen(true)} />;
}
