import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default function TextInput({ value, onChange, ...props }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      if (ref.current.value !== value) {
        ref.current.value = value;
      }
    }
  }, [ref, value]);
  return (
    <input
      ref={ref}
      type="text"
      onInput={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
