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
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
