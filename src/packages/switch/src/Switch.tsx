import cx from "classnames";
import Container from "@allaround/container";
import Label from "@allaround/label";

import Props from "./types";
import styles from "./style.module.scss";
import StyledSwitch from "./StyledSwitch";

const Switch = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  checked,
  shape,
  innerRef,
  onToggle,
  label,
  labelPosition,
  labelSize,
  className,
  ...rest
}: Props) => {
  return (
    <Container className={cx(styles.switchContainer)} onClick={onToggle} noGrid>
      {label && (
        <Label size={labelSize} className={cx(styles.label)}>
          {label}
        </Label>
      )}
      <StyledSwitch
        className={cx(
          styles.switch,
          {
            [styles.fill]: fill,
          },
          styles[`${size}Switch`],
          className
        )}
        ref={innerRef}
        gridPosition={gridPosition}
        {...rest}
        type="checkbox"
        data-cy={dataCy}
      />
      <span
        className={cx(
          styles.slider,
          {
            [styles.checked]: checked,
          },
          styles[`${labelPosition}Label`]
        )}
      />
    </Container>
  );
};

Switch.defaultProps = {
  size: "small",
  dataCy: "switch-component",
  labelPosition: "left",
};

export default Switch;
