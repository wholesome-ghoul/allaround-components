import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledNavbar from "./StyledNavbar";

const Navbar = ({
  children,
  gridPosition,
  dataCy,
  sticky,
  className,
  ...rest
}: Props) => {
  return (
    <StyledNavbar
      className={cx(
        styles.navbar,
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
    </StyledNavbar>
  );
};

Navbar.defaultProps = {
  dataCy: "navbar-component",
  sticky: false,
  gap: "1rem",
  grid: { cols: 12, rows: 1 },
};

export default Navbar;