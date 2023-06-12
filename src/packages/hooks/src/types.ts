import { SyntheticEvent, EventHandler } from "react";

type UseResizeObserverAction = (entry: ResizeObserverEntry) => void;

type UseEventListenerEventHandler = EventHandler<SyntheticEvent>;
type UseEventListenerElement = Window | Element | Document | MediaQueryList;

export type {
  UseResizeObserverAction,
  UseEventListenerEventHandler,
  UseEventListenerElement,
};