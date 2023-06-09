import cx from "classnames";

import Props from "./types";
import styles from "./style.module.scss";
import StyledLink from "./StyledLink";

const Link = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  href,
  ...rest
}: Props) => {
  return (
    <StyledLink
      className={cx(
        styles.link,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Link`],
        className
      )}
      href={href}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      {children}
    </StyledLink>
  );
};

Link.defaultProps = {
  size: "small",
  dataCy: "link-component",
};

export default Link;
