import cx from "classnames";
import { forwardRef, useRef } from "react";
import Tooltip from "@allaround/tooltip";

import Props from "./types";
import styles from "./style.module.scss";
import StyledInput from "./StyledInput";

const Input = forwardRef(function Input(
  {
    type,
    value,
    onChange,
    size,
    gridPosition,
    placeholder,
    fill,
    isError,
    minWidth,
    innerRef,
    dataCy,
    accept,
    tooltip,
    className,
    ...rest
  }: Props,
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const styledProps = { minWidth };

  return (
    <>
      <StyledInput
        className={cx(
          styles.input,
          {
            [styles.fill]: fill,
            [styles.isError]: isError,
          },
          styles[`${size}Input`],
          className
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        gridPosition={gridPosition}
        accept={accept}
        ref={inputRef}
        {...styledProps}
        {...rest}
        data-cy={dataCy}
      />

      {tooltip && (
        <Tooltip {...tooltip} componentRef={inputRef}>
          {tooltip.children}
        </Tooltip>
      )}
    </>
  );
});

Input.defaultProps = {
  size: "small",
  type: "text",
  dataCy: "input-component",
  minWidth: "auto",
};

export default Input;
