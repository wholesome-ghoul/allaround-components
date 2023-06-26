import { useLayoutEffect, useEffect, useRef } from "react";

import { UseEventListenerElement as TargetElement } from "./types";

function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement
>(
  eventName: K,
  eventHandler: (event: HTMLElementEventMap[K]) => void,
  element: TargetElement<T> | null | undefined,
  deps?: any[]
): void;

function useEventListener<K extends keyof WindowEventMap, T extends Window>(
  eventName: K,
  eventHandler: (event: WindowEventMap[K]) => void,
  element: TargetElement<T> | Window | null | undefined,
  deps?: any[]
): void;

function useEventListener<K extends keyof DocumentEventMap, T extends Document>(
  eventName: K,
  eventHandler: (event: DocumentEventMap[K]) => void,
  element: TargetElement<T> | null | undefined,
  deps?: any[]
): void;

function useEventListener<
  K extends keyof IDBRequestEventMap,
  T extends IDBRequest
>(
  eventName: K,
  eventHandler: (event: IDBRequestEventMap[K]) => void,
  element: TargetElement<T> | null | undefined,
  deps?: any[]
): void;

function useEventListener<
  K extends keyof IDBOpenDBRequestEventMap,
  T extends IDBOpenDBRequest
>(
  eventName: K,
  eventHandler: (event: IDBOpenDBRequestEventMap[K]) => void,
  element: TargetElement<T> | null | undefined,
  deps?: any[]
): void;

function useEventListener<
  K extends keyof IDBTransactionEventMap,
  T extends IDBTransaction
>(
  eventName: K,
  eventHandler: (event: IDBTransactionEventMap[K]) => void,
  element: TargetElement<T> | null | undefined,
  deps?: any[]
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KD extends keyof DocumentEventMap,
  KE extends keyof HTMLElementEventMap,
  IR extends keyof IDBRequestEventMap,
  IO extends keyof IDBOpenDBRequestEventMap,
  IT extends keyof IDBTransactionEventMap,
  T extends
    | Window
    | HTMLElement
    | Document
    | IDBRequest
    | IDBOpenDBRequest
    | IDBTransaction
>(
  eventName: KW | KE | IR | IO | KD | IT,
  eventHandler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KE]
      | IDBRequestEventMap[IR]
      | IDBOpenDBRequestEventMap[IO]
      | DocumentEventMap[KD]
      | IDBTransactionEventMap[IT]
  ) => void,
  element: TargetElement<T> | Window | null | undefined,
  deps: any[] = []
) {
  const handler = useRef(eventHandler);

  useLayoutEffect(() => {
    handler.current = eventHandler;
  }, [eventHandler]);

  useEffect(() => {
    const targetElement: T | Window =
      (element as TargetElement<T>)?.current ?? window;

    if (!targetElement) return;

    const valid = targetElement && targetElement.addEventListener;
    if (!valid) return;

    const _handler = (event: any) => handler.current(event);

    targetElement.addEventListener(eventName, _handler);

    return () => targetElement.removeEventListener(eventName, _handler);
  }, [element, eventName, ...deps]);
}

export default useEventListener;
