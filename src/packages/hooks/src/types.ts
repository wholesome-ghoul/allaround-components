import { SyntheticEvent, EventHandler, RefObject } from "react";

type UseResizeObserverAction = (entry: ResizeObserverEntry) => void;

type UseEventListenerEventHandler = EventHandler<
  SyntheticEvent & KeyboardEvent & MessageEvent
>;
type UseEventListenerElement<T> =
  // | Window
  // | Element
  // | Document
  // | MediaQueryList
  RefObject<T>;

export type {
  UseResizeObserverAction,
  UseEventListenerEventHandler,
  UseEventListenerElement,
};
