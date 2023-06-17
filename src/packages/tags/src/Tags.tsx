import { useState, useRef } from "react";
import cx from "classnames";
import Input from "@allaround/input";
import hooks from "@allaround/hooks";

import Props from "./types";
import Tag from "./Tag";
import styles from "./style.module.scss";
import StyledTags from "./StyledTags";

const { useEventListener } = hooks;

type TagElement = {
  name: string;
  elem: React.ReactNode;
};

const Tags = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  className,
  ...rest
}: Props) => {
  const [currentValue, setCurrentValue] = useState("");
  const [elements, setElements] = useState<TagElement[]>([]);
  const ref = useRef(null);

  useEventListener(
    "keydown",
    (e: any) => {
      if ((e.keyCode === 13 || e.keyCode === 188) && ref.current) {
        e.preventDefault();
        const newElement = (
          <Tag
            value={currentValue}
            key={`${currentValue}-${elements.length}}`}
            handleTagChange={handleTagChange}
            handleTagDel={handleTagDel}
          />
        );

        if (
          elements.find(
            (element: TagElement) => element.name === currentValue
          ) ||
          currentValue === ""
        ) {
          setCurrentValue("");
          return;
        }

        setElements((prevElements: TagElement[]) => {
          const newElements = [...prevElements];
          newElements.push({ name: currentValue, elem: newElement });
          return newElements;
        });
        setCurrentValue("");
      }
    },
    ref?.current!
  );

  const handleTagDel = (currValue: string) => {
    setElements((prevElements: TagElement[]) => {
      return prevElements.filter(
        (element: TagElement) => element.name !== currValue
      );
    });
  };

  const handleTagChange = (newValue: string, currValue: string) => {
    setElements((prevElements: TagElement[]) => {
      return prevElements
        .map((element: TagElement) => {
          if (element.name === currValue) {
            return { ...element, name: newValue };
          }

          return element;
        })
        .filter((element: TagElement) => element.name !== "");
    });
  };

  const handleMainInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(",")) {
      const newValues = e.target.value.split(",");
      const newElements: TagElement[] = [];

      newValues.forEach((value: string) => {
        if (
          elements.find((element: TagElement) => element.name === value) ||
          value === ""
        ) {
          return;
        }

        const newElement = (
          <Tag
            value={value}
            key={`${currentValue}-${elements.length}}`}
            handleTagChange={handleTagChange}
            handleTagDel={handleTagDel}
          />
        );

        newElements.push({ name: value, elem: newElement });
      });

      setElements((prevElements: TagElement[]) => {
        return [...prevElements, ...newElements];
      });

      return;
    }

    setCurrentValue(e.target.value);
  };

  const copyAllHandler = () => {
    navigator.clipboard.writeText(
      elements.map((element: TagElement) => element.name).join(",")
    );
  };

  const delAllHandler = () => {
    setElements([]);
  };

  return (
    <StyledTags
      className={cx(
        styles.tagsContainer,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Tags`],
        className
      )}
      innerRef={innerRef}
      gridPosition={gridPosition}
      current={elements.reduce((acc: number, curr: TagElement) => {
        return acc + curr.name.length;
      }, 0)}
      copyHandler={copyAllHandler}
      delHandler={delAllHandler}
      {...rest}
      data-cy={dataCy}
    >
      <div className={cx(styles.tags)}>
        {elements.map((element: TagElement) => element.elem)}
        <div className={cx(styles.tagMainInputContainer)}>
          <Input
            value={currentValue}
            onChange={handleMainInputOnChange}
            className={cx(styles.tagMainInput)}
            innerRef={ref}
            placeholder="Add tag"
          />
        </div>
      </div>
    </StyledTags>
  );
};

Tags.defaultProps = {
  size: "small",
  dataCy: "tags-component",
  counterIsInside: false,
};

export default Tags;
