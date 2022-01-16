import { useEffect, useState } from "preact/hooks";

export default function useDebounced(initialState, update) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const id = setTimeout(() => update(state), 200);
    return () => clearTimeout(id);
  }, [state]);

  return [state, setState];
}
