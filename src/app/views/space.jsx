import { Fragment, h } from "preact";
import { Adjustment, Archive, Cube } from "@app/components/icons.jsx";
import Button from "@app/components/button.jsx";

/** TODO */
export default function Space({ id }) {
  return (
    <>
      <div class="flex flex-col sm:flex-row w-full items-center justify-between">
        <div class="flex space-x-4 items-center">
          <Cube class="w-6 h-6 text-slate-500" />
          <h1 class="text-xl font-semibold dark:text-white">Untitled Space</h1>
        </div>
        <div class="flex space-x-4 items-center">
          <Button
            icon={<Adjustment />}
            title="Space Settings"
            onClick={() => {}}
            flat
          />
          <Button
            icon={<Archive />}
            title="Archive Completed"
            onClick={() => {}}
            flat
          />
        </div>
      </div>
    </>
  );
}
