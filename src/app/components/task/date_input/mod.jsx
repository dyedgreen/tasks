import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { useToday } from "@hooks/useNow.js";
import useDate from "@hooks/useDate.js";
import searchDate from "./search_date.js";
import { Beaker, Calendar, Clock, Lightning } from "@app/components/icons.jsx";
import Button from "@app/components/button.jsx";
import SearchDate from "./search_date.jsx";
import CalendarInput from "./calendar_input.jsx";
import Modal from "./modal.jsx";

export default function DateInput({ value, onChange }) {
  const [showInput, setShowInput] = useState(false);
  const [searchHasInput, setSearchHasInput] = useState(false);

  const today = useToday();
  let nextWorkday;
  if (today.getDay() === 5 /* Friday */) {
    nextWorkday = new Date(today.valueOf() + 3 * 24 * 60 * 60 * 1000);
  } else if (today.getDay() === 6 /* Saturday */) {
    nextWorkday = new Date(today.valueOf() + 2 * 24 * 60 * 60 * 1000);
  } else {
    nextWorkday = new Date(today.valueOf() + 24 * 60 * 60 * 1000);
  }
  let nextWorkdayDate = useDate(nextWorkday);

  const isToday = value != null && value.valueOf() === today.valueOf();
  const date = useDate(value ?? new Date());

  const onChangeAndClose = (date) => {
    onChange(date);
    setShowInput(false);
  };

  let modal = null;
  if (showInput) {
    modal = (
      <Modal
        class="
          w-80 p-2 px-3
          rounded shadow-lg
          dark:bg-slate-200 bg-slate-900 dark:text-slate-800 text-white
        "
        onClose={() => setShowInput(false)}
      >
        <SearchDate
          onChange={onChangeAndClose}
          setHasInput={setSearchHasInput}
        />
        {!searchHasInput && (
          <>
            <Button
              icon={<Lightning class="text-yellow-500" />}
              style="w-full text-inherit"
              title="Today"
              onClick={() => onChangeAndClose(today)}
              flat
            />
            <Button
              icon={<Calendar class="text-red-500" />}
              style="w-full text-inherit"
              title={nextWorkdayDate}
              onClick={() => onChangeAndClose(nextWorkday)}
              flat
            />
            <CalendarInput style="my-2" onInput={onChangeAndClose} />
            <Button
              icon={<Beaker />}
              title="Someday"
              style="w-full"
              onClick={() => onChangeAndClose(null)}
              flat
            />
          </>
        )}
      </Modal>
    );
  }

  let icon;
  if (isToday) {
    icon = <Lightning class="text-yellow-500" />;
  } else if (value != null && value.valueOf() < today.valueOf()) {
    icon = <Clock class="text-inherit" />;
  } else {
    icon = (
      <Calendar class={value != null ? "text-red-500" : "text-slate-500"} />
    );
  }

  return (
    <>
      <Button
        icon={icon}
        style={value != null ? "dark:text-slate-200 text-slate-700" : ""}
        title={value != null ? date : "Due Date"}
        onClick={() => setShowInput(true)}
        flat
      />
      {modal}
    </>
  );
}
