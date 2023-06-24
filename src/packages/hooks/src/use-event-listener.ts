import { useLayoutEffect, useEffect, useRef } from "react";

import {
  UseEventListenerEventHandler as EventHandler,
  UseEventListenerElement as TargetElement,
} from "./types";

function useEventListener<T extends HTMLElement | Element | Document | Window>(
  eventName: string,
  eventHandler: EventHandler,
  element: TargetElement<T> | null | undefined,
  deps: any[] = []
) {
  const handler = useRef(eventHandler);

  useLayoutEffect(() => {
    handler.current = eventHandler;
  }, [eventHandler]);

  useEffect(() => {
    if (!element?.current) return;

    const valid = element && element.current?.addEventListener;
    if (!valid) return;

    const _handler = (event: any) => handler.current(event);

    element.current.addEventListener(eventName, _handler);

    return () => element.current?.removeEventListener(eventName, _handler);
  }, [element, eventName, ...deps]);
}

export default useEventListener;
