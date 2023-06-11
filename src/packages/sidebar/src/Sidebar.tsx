import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledSidebar from "./StyledSidebar";

const Sidebar = ({
  children,
  gridPosition,
  dataCy,
  sticky,
  className,
  ...rest
}: Props) => {
  return (
    <StyledSidebar
      className={cx(
        styles.sidebar,
        {
          [styles.sticky]: sticky,
        },
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
  dataCy: "sidebar-component",
  sticky: false,
  gap: "1rem",
  grid: { cols: 1, rows: 12 },
};

export default Sidebar;
