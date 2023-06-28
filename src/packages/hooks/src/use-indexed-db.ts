import { useEffect, useLayoutEffect, useRef, useState } from "react";

import useEventListener from "./use-event-listener";

type ObjectStore = {
  name: string;
  keyPath: string;
  indices?: Array<{
    name: string;
    keyPath: string;
    options?: {
      unique: boolean;
    };
  }>;
};

type UseIndexedDb = {
  name: string;
  version?: number;
  store: ObjectStore;
  dbValues?: any[];
};

const useIndexedDb = ({
  name,
  version,
  store,
  dbValues = [],
}: UseIndexedDb) => {
  const request = useRef<IDBOpenDBRequest | null>(null);
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const transactionRef = useRef<IDBTransaction | null>(null);
  const [_dbValues, _setDbValues] = useState<any[]>(dbValues);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    request.current = window.indexedDB.open(name, version);
  }, [name, version]);

  useEventListener(
    "error",
    (e: any) => {
      console.log("DB error: ", e.target?.errorCode);
    },
    request
  );

  useEventListener(
    "success",
    (e) => {
      console.log("success");
      const target: IDBOpenDBRequest = e.target as IDBOpenDBRequest;
      setDb(target.result);
    },
    request
  );

  useEventListener(
    "upgradeneeded",
    (e) => {
      console.log("upgrade needed");
      const target: IDBOpenDBRequest = e.target as IDBOpenDBRequest;
      setDb(target.result);

      const objectStore = target.result.createObjectStore(store.name, {
        keyPath: store.keyPath,
      });

      store.indices?.forEach((index) => {
        objectStore.createIndex(index.name, index.keyPath, index.options);
      });

      transactionRef.current = objectStore?.transaction ?? null;
    },
    request
  );

  useEventListener(
    "complete",
    () => {
      console.log("complete");
    },
    transactionRef,
    [db, store]
  );

  useEffect(() => {
    const fetchDbValues = async () => {
      const _request = request.current;

      if (!_request) return;

      _request.onsuccess = (e: any) => {
        const db = e.target.result;

        const objectStore = db
          .transaction(store.name, "readwrite")
          .objectStore(store.name);

        const cursorRequest = objectStore.openCursor();
        const values: any[] = [];

        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;

          if (cursor) {
            values.push(cursor.value);
            cursor.continue();
          } else {
            _setDbValues(values);
            setIsFetched(true);
          }
        };

        cursorRequest.onerror = (event: Event) => {
          console.error(
            "Error retrieving records:",
            (event.target as IDBRequest<IDBCursorWithValue>).error
          );
        };
      };
    };

    fetchDbValues();
  }, [db]);

  const setDbValues = (values: any[]) => {
    const objectStore = request.current?.result
      .transaction(store.name, "readwrite")
      .objectStore(store.name);

    if (!objectStore) return;

    values.forEach((value) => {
      objectStore.add(value);
    });

    _setDbValues(values);
  };

  return { request, setDbValues, dbValues: _dbValues, isFetched };
};

export default useIndexedDb;
