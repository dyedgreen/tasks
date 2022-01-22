import { useEffect, useState } from "preact/hooks";

export default function useDebounced(initialState, update, timeout = 200) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const id = setTimeout(() => update(state), timeout);
    return () => clearTimeout(id);
  }, [state]);

  return [state, setState];
}
