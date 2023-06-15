import { useState, useEffect } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Label from "@allaround/label";

import Props from "./types";
import styles from "./style.module.scss";
import StyledTextarea from "./StyledTextarea";

const Textarea = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  isError,
  onChange,
  placeholder,
  value,
  max,
  htmlFor,
  label,
  className,
  ...rest
}: Props) => {
  const [_isError, setIsError] = useState(isError);
  const [showCounter, setShowCounter] = useState(false);
  const [totalChars, setTotalChars] = useState(0);

  useEffect(() => {
    if (!max) {
      setShowCounter(false);
      return;
    }

    setShowCounter(true);

    if (totalChars > max) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [max, totalChars]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTotalChars(e.target.value.length);
    onChange && onChange(e);
  };

  return (
    <Container
      grid={{
        cols: 1,
        rows: "1fr 5fr 1fr",
        gap: "10px",
      }}
      styles={{ width: "100%" }}
      className={cx(styles.container, {
        [styles.isErrorContainer]: isError || _isError,
      })}
      autoHor
    >
      {!!label && (
        <Container noGrid>
          <Label htmlFor={htmlFor} size="small" className={cx(styles.label)}>
            {label}
          </Label>
        </Container>
      )}
      <Container noGrid>
        <StyledTextarea
          className={cx(
            styles.textarea,
            {
              [styles.fill]: fill,
            },
            styles[`${size}Textarea`],
            className
          )}
          onChange={handleOnChange}
          placeholder={placeholder}
          value={value}
          ref={innerRef}
          gridPosition={gridPosition}
          {...rest}
          data-cy={dataCy}
        />
      </Container>
      {showCounter && (
        <Container noGrid styles={{ textAlign: "right" }}>
          {totalChars}/{max}
        </Container>
      )}
    </Container>
  );
};

Textarea.defaultProps = {
  size: "small",
  dataCy: "textarea-component",
  resize: "none",
  // width: "400px",
  // height: "200px",
  hasCounter: false,
  isError: false,
};

export default Textarea;
