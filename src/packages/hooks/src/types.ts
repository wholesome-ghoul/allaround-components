import { RefObject, MutableRefObject } from "react";

type UseResizeObserverAction = (entry: ResizeObserverEntry) => void;

type UseEventListenerElement<T> =
  // | Window
  // | Element
  // | Document
  // | MediaQueryList
  RefObject<T> | MutableRefObject<T>;

export type { UseResizeObserverAction, UseEventListenerElement };
