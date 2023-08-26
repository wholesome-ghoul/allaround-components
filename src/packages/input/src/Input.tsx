import cx from "classnames";
import { forwardRef, useEffect, useRef, useState } from "react";
import Tooltip from "@allaround/tooltip";
import Container from "@allaround/container";
import hooks from "@allaround/hooks";

import Props from "./types";
import styles from "./style.module.scss";
import StyledInput from "./StyledInput";
import { DisplayError } from "../../../utils";

const { useEventListener } = hooks;

const Input = forwardRef(function Input(
  {
    type,
    value,
    onChange,
    size,
    gridPosition,
    placeholder,
    fill,
    minWidth,
    innerRef,
    dataCy,
    accept,
    tooltip,
    required,
    setIsError,
    onFocus,
    onBlur,
    icon,
    isError = false,
    className,
    ...rest
  }: Props,
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<DisplayError>({ text: "", show: false });
  const styledProps = { minWidth };

  const noError = () => {
    setError({ text: "", show: false });
    setIsError && setIsError(false);
  };

  useEffect(() => {
    if (isError) return;

    setError({ text: "", show: isError });
  }, [isError]);

  useEventListener(
    "focusout",
    () => {
      if (value === "" && required) {
        setError({ text: "This field is required", show: true });
        return setIsError && setIsError(true);
      }

      return noError();
    },
    inputRef,
    [required, setError, setIsError, value]
  );

  useEffect(() => {
    if (required && value && value.toString().length > 0) {
      noError();
    }
  }, [required, value]);

  return (
    <Container className={cx(styles.container)} noGrid>
      {icon && (
        <Container className={cx(styles.iconContainer)} noGrid>
          {icon}
        </Container>
      )}

      <StyledInput
        className={cx(
          styles.input,
          styles[`${size}Input`],
          {
            [styles.fill]: fill,
            [styles.withIcon]: !!icon,
            [styles.isError]: isError || error.show,
          },
          className
        )}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        gridPosition={gridPosition}
        accept={accept}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        {...styledProps}
        {...rest}
        data-cy={dataCy}
      />

      {setIsError && error.show && (
        <Container className={cx(styles.errorContainer)} noGrid>
          {error.text}
        </Container>
      )}

      {tooltip && (
        <Tooltip {...tooltip} componentRef={inputRef}>
          {tooltip.children}
        </Tooltip>
      )}
    </Container>
  );
});

Input.defaultProps = {
  size: "small",
  type: "text",
  dataCy: "input-component",
  minWidth: "auto",
};

export default Input;
