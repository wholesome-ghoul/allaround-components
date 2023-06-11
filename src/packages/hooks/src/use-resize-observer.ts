import { useRef, useEffect } from "react";

import type { UseResizeObserverAction as Action } from "./types";

/**
 * useResizeObserver hook
 *
 * @param elem - The element to observe
 * @param action - The action to perform when the element resizes
 * @returns void
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *  const ref = useRef<HTMLDivElement>(null);
 *  const [width, setWidth] = useState(0);
 *  const [height, setHeight] = useState(0);
 *
 *  useResizeObserver(ref.current, (entry) => {
 *    setWidth(entry.contentRect.width);
 *    setHeight(entry.contentRect.height);
 *  });
 *
 *  return (
 *      <div ref={ref}>
 *        {width} x {height}
 *      </div>
 *    );
 *  };
 * ```
 */
const useResizeObserver = (elem: Element, action: Action) => {
  const actionRef = useRef<Action>(action);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    actionRef.current = action;

    const resizeObserver = new ResizeObserver((entries) => {
      if (actionRef.current) {
        for (const entry of entries) {
          actionRef.current(entry);
        }
      }
    });

    resizeObserverRef.current = resizeObserver;
  }, [action]);

  useEffect(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.observe(elem);

      return () => {
        resizeObserverRef.current && resizeObserverRef.current.unobserve(elem);
      };
    }
  }, [elem]);
};

export default useResizeObserver;
