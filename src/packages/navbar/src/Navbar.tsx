import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledNavbar from "./StyledNavbar";

const Navbar = ({
  children,
  gridPosition,
  dataCy,
  sticky,
  innerRef,
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
      innerRef={innerRef}
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
  grid: { cols: 12, rows: 1 },
};

export default Navbar;
