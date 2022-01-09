import { useEffect, useState } from "preact/hooks";

export function useNow(updateEvery = 1000) {
  const [now, setNow] = useState(new Date());
  useEffect(
    () => {
      const id = setTimeout(() => setNow(new Date()), updateEvery);
      return () => clearTimeout(id);
    },
    [setNow],
  );
  return now;
}

export function useToday() {
  const now = useNow(60 * 1000);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}
