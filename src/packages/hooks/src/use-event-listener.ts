import { useEffect, useRef } from "react";

import {
  UseEventListenerEventHandler as EventHandler,
  UseEventListenerElement as Element,
} from "./types";

const useEventListener = (
  eventName: string,
  eventHandler: EventHandler,
  element: Element = window,
  deps: any[] = []
) => {
  const handler = useRef((_event: any) => {});

  useEffect(() => {
    handler.current = eventHandler;
  }, [eventHandler, ...deps]);

  useEffect(() => {
    const valid = element && element.addEventListener;
    if (!valid) return;

    const _handler = (event: any) => handler.current(event);

    element.addEventListener(eventName, _handler);

    return () => element.removeEventListener(eventName, _handler);
  }, [element, eventName, ...deps]);
};

export default useEventListener;
