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
    if (required && value && value.length > 0) {
      noError();
    }
  }, [required, value]);

  return (
    <>
      <StyledInput
        className={cx(
          styles.input,
          {
            [styles.fill]: fill,
            [styles.isError]: isError || error.show,
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
