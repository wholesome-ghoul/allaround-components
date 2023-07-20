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

const Notification = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  variant,
  heading,
  content,
  className,
  ...rest
}: Props) => {
  const icon = iconMapper[variant];

  return (
    <StyledNotification
      className={cx(
        styles.notification,
        {
          [styles.fill]: fill,
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
      <Container className={cx(styles.textContainer)} noGrid>
        <div className={cx(styles.textHeading)}>{heading}</div>
        <div className={cx(styles.textContent)}>{content}</div>
      </Container>
      <Container className={cx(styles.closeContainer)} noGrid>
        <Button
          className={cx(styles.closeButton)}
          icon={<Icons.DelNoBorderIcon size="12px" />}
          onClick={() => {}}
          transparent
          hoverTransparent
          noBorder
        />
      </Container>
    </StyledNotification>
  );
};

Notification.defaultProps = {
  size: "small",
  dataCy: "notification-component",
  variant: "info",
};

export default Notification;
