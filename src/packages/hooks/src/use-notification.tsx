import { useCallback, useMemo, useRef, useState } from "react";
import Notification from "@allaround/notification";
import type { NotificationProps } from "@allaround/notification";

type Position = {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
};

type UseNotification = {
  position: NotificationProps["position"];
};

type OmittedNotificationProps = Omit<NotificationProps, "position">;

const defaultCoordinates: Position = {
  top: 0,
  left: "auto",
  right: "auto",
  bottom: "auto",
};

const coordinatesMapper: { [key: string]: Position } = {
  top: {
    top: 0,
    left: "auto",
    right: "auto",
    bottom: "auto",
  },
  bottom: {
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: 0,
  },
  "top-right": {
    top: 0,
    left: "auto",
    right: 0,
    bottom: "auto",
  },
};

const NotificationsContainer = (
  position: Position,
  notificationsProps: object[],
  innerRef: React.RefObject<HTMLDivElement>
) => {
  const memoizedNotifications = useMemo(() => {
    return notificationsProps.map((notification: any) => (
      <Notification
        {...notification}
        position={notification.position}
        key={notification.key}
        onClose={notification.onClose}
      />
    ));
  }, [notificationsProps]);

  return (
    <div
      style={{
        maxWidth: "90%",
        position: "fixed",
        display: "flex",
        flexFlow: "column",
        gap: "4px",
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        zIndex: 9999,
      }}
      ref={innerRef}
    >
      {memoizedNotifications}
    </div>
  );
};

const useNotification = ({ position }: UseNotification) => {
  const [notificationElemsProps, setNotificationElemsProps] = useState<
    Map<string, object>
  >(new Map());
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    return coordinatesMapper[position] || defaultCoordinates;
  }, [position]);

  const container = useCallback(() => {
    const position = calculatePosition();

    return NotificationsContainer(
      position,
      Array.from(notificationElemsProps.values()),
      containerRef
    );
  }, [notificationElemsProps, calculatePosition]);

  const close = (name: string) => {
    setNotificationElemsProps((prev) => {
      const newMap = new Map(prev);
      newMap.delete(name);
      return newMap;
    });

    if (timeoutsRef.current.has(name)) {
      clearTimeout(timeoutsRef.current.get(name));
    }
  };

  const push = (name: string, notification: OmittedNotificationProps) => {
    const elemProps = {
      ...notification,
      key: name,
      onClose: () => close(name),
      position,
    };

    setNotificationElemsProps((prev) => {
      const newMap = new Map(prev);
      newMap.set(name, elemProps);
      return newMap;
    });

    // if (timeoutsRef.current.has(name)) {
    //   clearTimeout(timeoutsRef.current.get(name));
    // }

    // if (notification.withTimer) {
    //   const timeout = setTimeout(() => {
    //     close(name);
    //   }, 5000);

    //   timeoutsRef.current.set(name, timeout);
    // }
  };

  return {
    push,
    container,
  };
};

export default useNotification;
