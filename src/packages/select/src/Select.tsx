import { useState, useRef } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Button from "@allaround/button";
import Icons from "@allaround/icons";
import Text from "@allaround/text";
import hooks from "@allaround/hooks";

import type { Props, Option } from "./types";
import styles from "./style.module.scss";
import StyledSelect from "./StyledSelect";

const { useEventListener } = hooks;

const Select = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  setSelectedOption,
  selectedOption,
  options,
  maxHeight,
  ...rest
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<Document>(document);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [_maxHeight, _setMaxHeight] = useState(maxHeight ?? "");

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    setIsOpen(false);
    setSelectedOption(option);
  };

  useEventListener(
    "click",
    () => {
      if (selectRef?.current) {
        const { top, bottom } = selectRef.current.getBoundingClientRect();
        const bot = window.innerHeight - bottom;

        if (top > bot) {
          setDirection("up");
          _setMaxHeight(`${top - 8}px`);
        } else {
          setDirection("down");
          _setMaxHeight(`${bot - 8}px`);
        }
      }
    },
    selectRef
  );

  useEventListener(
    "click",
    (e: any) => {
      if (selectRef?.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    documentRef
  );

  return (
    <StyledSelect
      className={cx(
        styles.select,
        {
          [styles.fill]: fill,
          [styles.active]: isOpen,
        },
        styles[`${size}Select`],
        className
      )}
      ref={selectRef}
      maxHeight={maxHeight ?? _maxHeight}
      onClick={handleOpen}
      gridPosition={gridPosition}
      direction={direction}
      {...rest}
      data-cy={dataCy}
    >
      <Button
        onClick={() => {}}
        className={cx(styles.selectButton)}
        noBorder
        transparent
        fill
      >
        <Text className={cx(styles.text)}>{selectedOption.label}</Text>
        <Icons.ArrowDownIcon className={cx(styles.arrow)} />
      </Button>
      <Container
        className={cx(styles.optionsContainer, {
          [styles.none]: !isOpen,
        })}
        noGrid
      >
        {options.map((option) => (
          <Option
            key={option.value}
            option={option}
            handleSelect={handleSelect}
            isSelected={selectedOption.value === option.value}
            {...option}
          />
        ))}
      </Container>
    </StyledSelect>
  );
};

type OptionProps = {
  option: Option;
  handleSelect: (option: Option) => void;
  isSelected: boolean;
};

const Option = ({ option, handleSelect, isSelected }: OptionProps) => {
  return (
    <Container
      className={cx(styles.option, {
        [styles.selectedOption]: isSelected,
      })}
      onClick={() => handleSelect(option)}
      noGrid
    >
      {option.label}
    </Container>
  );
};

Select.defaultProps = {
  size: "small",
  dataCy: "select-component",
};

export default Select;
