import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";
import Container from "@allaround/container";
import Label from "@allaround/label";
import Icons from "@allaround/icons";
import Button from "@allaround/button";

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
  current,
  rows,
  htmlFor,
  label,
  counterIsInside,
  flex,
  setIsError,
  className,
  ...rest
}: Props) => {
  const [_isError, _setIsError] = useState(isError);
  const [showCounter, setShowCounter] = useState(false);
  const [totalChars, setTotalChars] = useState(current ?? 0);
  const parentContainerRef = useRef(null);

  useEffect(() => {
    if (!max) {
      setShowCounter(false);
      return;
    }

    setShowCounter(true);
    if (current !== undefined) setTotalChars(current);

    if (totalChars > max) {
      _setIsError(true);
      setIsError && setIsError(true);
    } else {
      _setIsError(false);
      setIsError && setIsError(false);
    }
  }, [max, totalChars, current]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTotalChars(e.target.value.length);
    onChange && onChange(e);
  };

  return (
    <Container
      innerRef={parentContainerRef}
      className={cx({
        [styles.border]: counterIsInside,
        [styles.isError]: isError || _isError,
        [styles.parentContainer]: !(isError || _isError),
        [styles.isErrorContainer]: counterIsInside && (isError || _isError),
      })}
      grid={
        flex
          ? undefined
          : {
              cols: 1,
              rows: "auto",
            }
      }
      styles={{ width: "100%" }}
      gridPosition={gridPosition}
      flex={flex}
      noGrid={flex}
      autoHor
    >
      <Container
        grid={{
          cols: 1,
          rows: "auto 5fr auto",
          gap: "10px",
        }}
        styles={{ width: "100%" }}
        className={cx({
          [styles.border]: !counterIsInside,
          [styles.isErrorContainer]: !counterIsInside && (isError || _isError),
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
          {children ?? (
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
              rows={rows}
              ref={innerRef}
              {...rest}
              data-cy={dataCy}
            />
          )}
        </Container>

        <Utilities
          {...{
            showCounter,
            counterIsInside,
            parentContainerRef,
            totalChars,
            max,
          }}
          {...rest}
        />
      </Container>
    </Container>
  );
};

const Utilities = ({
  showCounter,
  counterIsInside,
  parentContainerRef,
  totalChars,
  max,
  ...rest
}: any) => {
  if (!showCounter) return;

  if (!counterIsInside && parentContainerRef) {
    return createPortal(
      <UtilityComponents
        totalChars={totalChars}
        max={max}
        className={cx(styles.outsideCounter)}
        {...rest}
      />,
      parentContainerRef.current
    );
  }

  return <UtilityComponents totalChars={totalChars} max={max} {...rest} />;
};

const UtilityComponents = ({ totalChars, max, className, ...rest }: any) => {
  return (
    <Container
      grid={{
        cols: "auto auto 1fr",
        rows: 1,
        gap: "5px",
      }}
      className={className}
      {...rest}
    >
      {rest.copyHandler && (
        <Button
          icon={<Icons.CopyIcon size="large" />}
          onClick={rest.copyHandler}
          styles={{ color: "inherit" }}
          noBorder
        />
      )}
      {rest.delHandler && (
        <Button
          icon={<Icons.DelIcon size="large" />}
          onClick={rest.delHandler}
          styles={{ color: "inherit" }}
          noBorder
        />
      )}
      <Container
        noGrid
        className={cx(styles.counterContainer)}
        gridPosition={{ colPos: 3 }}
      >
        {totalChars}/{max}
      </Container>
    </Container>
  );
};

Textarea.defaultProps = {
  size: "small",
  dataCy: "textarea-component",
  resize: "none",
  isError: false,
  counterIsInside: true,
};

export default Textarea;
