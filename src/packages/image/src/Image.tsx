import { useState, useEffect } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Button from "@allaround/button";
import Icons from "@allaround/icons";

import Props from "./types";
import styles from "./style.module.scss";
import StyledImage from "./StyledImage";

const Image = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  className,
  src,
  file,
  alt,
  width,
  height,
  removeHandler,
  ...rest
}: Props) => {
  const [_src, _setSrc] = useState(src);

  useEffect(() => {
    if (src) {
      _setSrc(src);

      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        _setSrc(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }, [src, file]);

  return (
    <Container className={cx(styles.imageContainer)} noGrid>
      <StyledImage
        className={cx(
          styles.image,
          {
            [styles.fill]: fill,
          },
          styles[`${size}Image`],
          className
        )}
        ref={innerRef}
        gridPosition={gridPosition}
        src={_src}
        alt={alt}
        width={width}
        height={height}
        {...rest}
        data-cy={dataCy}
      />
      <Button
        onClick={() => removeHandler && removeHandler()}
        icon={<Icons.DelIcon size="large"/>}
        className={cx(styles.delButton)}
        noBorder
        transparent
      />
    </Container>
  );
};

Image.defaultProps = {
  size: "small",
  dataCy: "image-component",
  width: "100%",
  height: "100%",
};

export default Image;
