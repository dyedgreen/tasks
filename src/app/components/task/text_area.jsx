import { h } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

export default function TextBox({ value, onChange, ...props }) {
  const ref = useRef();
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
    const listener = (event) => {
      if (ref.current === event.target) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    };
    document.addEventListener("input", listener);
    return () => document.removeEventListener("input", listener);
  }, [ref]);

  return (
    <textarea
      ref={ref}
      value={value}
      onInput={(e) => onChange(e.target.value)}
      {...props}
    />
  );
}
