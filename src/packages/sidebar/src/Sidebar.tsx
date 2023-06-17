import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledSidebar from "./StyledSidebar";

const Sidebar = ({
  children,
  gridPosition,
  dataCy,
  sticky,
  innerRef,
  overlap,
  className,
  ...rest
}: Props) => {
  return (
    <StyledSidebar
      className={cx(
        styles.sidebar,
        {
          [styles.sticky]: sticky,
          [styles.overlap]: overlap,
        },
        className
      )}
      gridPosition={gridPosition}
      innerRef={innerRef}
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
  overlap: false,
  gap: "1rem",
  grid: { cols: 1, rows: "repeat(12, 1fr)" },
};

export default Sidebar;
