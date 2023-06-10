import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledSidebar from "./StyledSidebar";

const Sidebar = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  ...rest
}: Props) => {
  return (
    <StyledSidebar
      className={cx(
        styles.sidebar,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Sidebar`],
        className
      )}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </StyledSidebar>
  );
};

Sidebar.defaultProps = {
  size: "small",
  dataCy: "sidebar-component",
};

export default Sidebar;
