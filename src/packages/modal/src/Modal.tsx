import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledModal from "./StyledModal";

const Modal = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  visible,
  className,
  ...rest
}: Props) => {
  return (
    <StyledModal
      className={cx(
        styles.modal,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Modal`],
        className
      )}
      ref={innerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
      open={visible}
    >
      {children}
    </StyledModal>
  );
};

Modal.defaultProps = {
  size: "small",
  dataCy: "modal-component",
  visible: false,
};

export default Modal;
