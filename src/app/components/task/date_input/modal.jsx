import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default function Modal({ onClose, children, ...props }) {
  const refOuter = useRef();
  const refInner = useRef();

  useEffect(() => {
    const onEvent = (event) => {
      if (
        refInner.current && !refInner.current.contains(event.target) &&
        typeof onClose === "function"
      ) {
        event.stopPropagation();
        onClose();
      }
    };
    refOuter.current?.addEventListener("mousedown", onEvent);
    return () => refOuter.current?.removeEventListener("mousedown", onEvent);
  }, [refOuter, refInner, onClose]);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };
    refOuter.current?.addEventListener("keydown", onEsc);
    return () => refOuter.current?.removeEventListener("keydown", onEsc);
  }, [refOuter, onClose]);

  return (
    <div
      ref={refOuter}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
      }}
      class="bg-black/30 flex w-full h-full justify-center items-center"
    >
      <div ref={refInner} {...props}>{children}</div>
    </div>
  );
}
