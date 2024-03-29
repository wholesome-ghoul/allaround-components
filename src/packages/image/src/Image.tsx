import { useState, useEffect } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Button from "@allaround/button";
import Icons from "@allaround/icons";
import Upload from "@allaround/upload";

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
  alt,
  width,
  height,
  clickHandler,
  icon,
  iconPosition,
  objectFit,
  editable,
  inheritBorderColor,
  variant,
  ratio,
  noMargin,
  fitContainer,
  ...rest
}: Props) => {
  const [_src, _setSrc] = useState("");

  useEffect(() => {
    if (!src) return;

    if (typeof src === "string") _setSrc(src);
    else if (src instanceof File) {
      const reader = new FileReader();

      reader.onload = (e) => {
        _setSrc(e.target?.result as string);
      };

      reader.readAsDataURL(src);
    }
  }, [src]);

  return (
    <Container
      className={cx(
        styles.imageContainer,
        {
          [styles.inheritBorderColor]: inheritBorderColor,
          [styles.containerMargin]: !noMargin,
          [styles.unsetDimensions]: !fitContainer,
        },
        styles[`${variant}Container`]
      )}
      noGrid
    >
      <StyledImage
        className={cx(
          styles.image,
          {
            [styles.fill]: fill,
          },
          styles[`${size}Image`],
          styles[`${variant}Image`],
          className
        )}
        ref={innerRef}
        gridPosition={gridPosition}
        ratio={ratio}
        src={_src}
        alt={alt}
        width={width}
        height={height}
        objectFit={objectFit}
        {...rest}
        data-cy={dataCy}
      />
      {clickHandler && !editable && (
        <Button
          onClick={clickHandler}
          icon={<Icons.DelIcon size="medium" />}
          className={cx(styles.iconButton, styles[`${iconPosition}Icon`])}
          noBorder
          transparent
        />
      )}

      {icon && !clickHandler && !editable && (
        <div
          className={cx(styles.iconContainer, styles[`${iconPosition}Icon`])}
        >
          {icon}
        </div>
      )}

      {!clickHandler && editable && (
        <Upload
          accept={rest.accept ?? ["image/png"]}
          maxSize={rest.maxSize}
          setIsError={rest.setIsError}
          setFile={rest.setFile ?? (() => {})}
          icon={<Icons.EditIcon size="small" />}
          className={cx(styles.iconButton, styles[`${iconPosition}Icon`])}
          noBorder
        />
      )}
    </Container>
  );
};

Image.defaultProps = {
  size: "small",
  dataCy: "image-component",
  width: "100%",
  height: "100%",
  iconPosition: "topLeft",
  inheritBorderColor: false,
};

export default Image;
