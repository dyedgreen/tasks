import { h } from "preact";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";

function targetIsHandle(ref, event) {
  let current = event.target;
  while (current !== ref.current) {
    if (current.id === "reorder") return true;
    current = current.parentNode;
  }
  return false;
}

function getItem(ref, event) {
  let current = event.target;
  while (current.parentNode !== ref.current) {
    current = current.parentNode;
  }
  return current;
}

export default function Reorder({ items, render, onChange, style }) {
  const onChangeRef = useRef();
  onChangeRef.current = onChange;
  const ref = useRef();

  const [remount, setRemount] = useState(false);
  useLayoutEffect(() => {
    if (remount) setRemount(false);
  }, [remount, setRemount]);

  useEffect(() => {
    const state = {
      dragging: false,
      offset: { x: 0, y: 0 },
      item: null,
      items: null,
    };

    const onMouseDown = (event) => {
      if (targetIsHandle(ref, event)) {
        state.dragging = true;
        state.offset = { x: 0, y: 0 };
        state.items = [...ref.current.childNodes];
        const item = getItem(ref, event);
        for (let i = 0; i < state.items.length; i++) {
          if (item === state.items[i]) {
            state.item = i;
            break;
          }
        }
      }
    };

    const onMouseUp = (event) => {
      if (state.dragging) {
        // determine item order
        const before = [];
        const after = [];
        const itemHeight = state.item + 1 < state.items.length
          ? state.items[state.item + 1].offsetTop -
            state.items[state.item].offsetTop
          : state.items[state.item].scrollHeight;
        const itemOffset = state.items[state.item].offsetTop + state.offset.y +
          itemHeight * 0.2;
        for (let i = 0; i < state.items.length; i++) {
          if (i < state.item) {
            // items above
            if (itemOffset < state.items[i].offsetTop) {
              after.push(i);
            } else {
              before.push(i);
            }
          } else if (i > state.item) {
            // items below
            if (itemOffset > state.items[i].offsetTop) {
              before.push(i);
            } else {
              after.push(i);
            }
          }
        }

        // apply changes
        onChangeRef.current([...before, state.item, ...after]);
        setRemount(true);

        // cleanup
        state.items[state.item].style.boxShadow = "none";
        state.items[state.item].style.zIndex = "auto";
        for (const item of state.items) {
          item.style.transform = "none";
        }
        // reset state
        state.dragging = false;
        state.offset = { x: 0, y: 0 };
        state.item = null;
        state.items = null;
      }
    };

    const onMouseMove = (event) => {
      if (state.dragging) {
        state.offset.x += event.movementX;
        state.offset.y += event.movementY;

        const itemOffsetFromParent = state.items[state.item].offsetTop -
          ref.current.offsetTop + state.items[state.item].scrollHeight * 0.5;
        let offsetY;
        if (state.offset.y >= 0) {
          offsetY = Math.min(
            state.offset.y,
            ref.current.clientHeight - itemOffsetFromParent,
          );
          offsetY += Math.log2(state.offset.y - offsetY + 1);
        } else {
          offsetY = Math.max(state.offset.y, -itemOffsetFromParent);
          offsetY -= Math.log2(offsetY - state.offset.y + 1);
        }

        const offsetX = Math.sign(state.offset.x) *
          Math.abs(Math.max(Math.log2(Math.abs(state.offset.x)), 0));

        state.items[state.item].style.transform =
          `translate(${offsetX}px, ${offsetY}px)`;
        state.items[state.item].style.boxShadow = "0 2px 5px 0 rgba(0,0,0,0.2)";
        state.items[state.item].style.zIndex = "100";
        state.items[state.item].style.position = "relative";

        const itemHeight = state.item + 1 < state.items.length
          ? state.items[state.item + 1].offsetTop -
            state.items[state.item].offsetTop
          : state.items[state.item].scrollHeight +
            8 /* this is specific to the item margins we have(!) */;
        const itemOffset = state.items[state.item].offsetTop + offsetY +
          itemHeight * 0.2;
        for (let i = 0; i < state.items.length; i++) {
          if (i < state.item) {
            // items above
            if (itemOffset < state.items[i].offsetTop) {
              state.items[i].style.transform =
                `translate(0px, ${itemHeight}px)`;
            } else {
              state.items[i].style.transform = "none";
            }
          } else if (i > state.item) {
            // items below
            if (itemOffset > state.items[i].offsetTop) {
              state.items[i].style.transform =
                `translate(0px, -${itemHeight}px)`;
            } else {
              state.items[i].style.transform = "none";
            }
          }
        }
      }
    };

    ref?.current?.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      ref?.current?.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [ref, onChangeRef]);

  return (
    <div class={style} ref={ref}>
      {remount ? null : items.map(render)}
    </div>
  );
}
