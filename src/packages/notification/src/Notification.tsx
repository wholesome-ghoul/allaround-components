import { memo, useEffect, useRef, useState } from "react";
import cx from "classnames";
import Icons from "@allaround/icons";
import Container from "@allaround/container";
import Button from "@allaround/button";

import Props from "./types";
import styles from "./style.module.scss";
import StyledNotification from "./StyledNotification";

const iconMapper: { [key: string]: JSX.Element } = {
  success: <Icons.SuccessIcon size="medium" />,
  alert: <Icons.AlertIcon size="medium" />,
  warning: <Icons.WarningIcon size="medium" />,
  info: <Icons.InfoIcon size="medium" />,
};

const Notification: React.FC<Props> = memo(
  ({
    children,
    size,
    gridPosition,
    fill,
    dataCy,
    innerRef,
    variant,
    heading,
    content,
    position,
    withTimer,
    onClose,
    className,
    ...rest
  }: Props) => {
    const [display, setDisplay] = useState(true);
    const icon = iconMapper[variant];
    const timerRef = useRef<HTMLDivElement>(null);

    const closeHandler = () => {
      setDisplay(false);

      onClose && onClose();
    };

    useEffect(() => {
      if (withTimer && timerRef.current) {
        timerRef.current.style.width = "0";
      }
    }, []);

    return (
      <StyledNotification
        className={cx(
          styles.notification,
          {
            [styles.fill]: fill,
            [styles.none]: !display,
          },
          styles[`${size}Notification`],
          styles[`${variant}Notification`],
          className
        )}
        ref={innerRef}
        gridPosition={gridPosition}
        {...rest}
        data-cy={dataCy}
      >
        <Container className={cx(styles.iconContainer)} noGrid>
          {icon}
        </Container>
        <Container
          className={cx(styles.textContainer, {
            [styles.textHeadingWithoutContent]: !content,
          })}
          noGrid
        >
          <div className={cx(styles.textHeading)}>{heading}</div>
          <div>{content}</div>
        </Container>
        <Container className={cx(styles.closeContainer)} noGrid>
          <Button
            className={cx(styles.closeButton)}
            icon={<Icons.DelNoBorderIcon size="16px" />}
            onClick={closeHandler}
            transparent
            hoverTransparent
            noBorder
          />
        </Container>
        {false && withTimer && (
          <div className={cx(styles.timer)} ref={timerRef} />
        )}
      </StyledNotification>
    );
  }
);

Notification.defaultProps = {
  size: "small",
  dataCy: "notification-component",
  variant: "info",
};

export default Notification;
