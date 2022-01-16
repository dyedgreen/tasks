import { h } from "preact";
import { write } from "@lib/sqlite.js";
import { Exclamation, Refresh } from "@app/components/icons.jsx";
import Button from "@app/components/button.jsx";

export default function Error({ error }) {
  const clearDatabase = () => {
    write("tasks.sqlite", new Uint8Array())
      .then(() => location.reload());
  };

  return (
    <div class="w-full h-full flex justify-center items-center">
      <div class="
        flex flex-col justify-center items-center p-4
        bg-red-500 text-white rounded-md
      ">
        <Exclamation class="w-10 h-10" />
        <div class="mb-4">
          <h1 class="w-full text-center text-xl font-bold ">
            Something went wrong
          </h1>
          <p class="w-full text-sm text-center">Error: {error.message}</p>
        </div>
        <Button
          icon={<Refresh />}
          title="Clear Database"
          style="bg-red-700 text-white"
          onClick={clearDatabase}
        />
      </div>
    </div>
  );
}
