import { h } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

export default function TextBox({
  value,
  onChange,
  minHeight = "0",
  ...props
}) {
  const ref = useRef();
  useLayoutEffect(() => {
    const resize = () => {
      ref.current.style.height = minHeight;
      ref.current.style.height = ref.current.scrollHeight + "px";
    };
    if (ref.current) resize();
    const inputListener = (event) => {
      if (ref.current === event.target) {
        resize();
      }
    };
    document.addEventListener("input", inputListener);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("input", inputListener);
      window.removeEventListener("resize", resize);
    };
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
