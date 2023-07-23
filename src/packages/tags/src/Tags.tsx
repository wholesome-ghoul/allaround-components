import { useState, useRef, useEffect } from "react";
import cx from "classnames";
import Input from "@allaround/input";
import hooks from "@allaround/hooks";

import Props from "./types";
import Tag from "./Tag";
import styles from "./style.module.scss";
import StyledTags from "./StyledTags";

const { useEventListener } = hooks;

function areArraysEqual(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((element: string) => arr2.includes(element));
}

type TagElement = {
  name: string;
  value: string;
  index: string;
};

const Tags = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  onChange,
  copyCallback,
  className,
  initialTags = [],
  ...rest
}: Props) => {
  const [currentValue, setCurrentValue] = useState("");
  const [elements, setElements] = useState<TagElement[]>([]);
  const ref = useRef(null);

  useEffect(() => {
    if (initialTags && initialTags.length > 0) {
      const newElements: TagElement[] = Array.from(new Set(initialTags)).map(
        (value: string) => {
          const trimmedValue = value.trim();
          const index = `${trimmedValue}-${initialTags.length}`;

          return { name: trimmedValue, value: trimmedValue, index };
        }
      );

      setElements(newElements);
    }
  }, [initialTags]);

  useEventListener(
    "keydown",
    (e: any) => {
      if ((e.keyCode === 13 || e.keyCode === 188) && ref.current) {
        e.preventDefault();
        const trimmedValue = currentValue.trim();
        const index = `${trimmedValue}-${elements.length}`;

        if (
          !elements.find(
            (element: TagElement) => element.name === trimmedValue
          ) &&
          trimmedValue !== ""
        ) {
          setElements((prevElements: TagElement[]) => {
            const newElements = [...prevElements];
            newElements.push({
              name: trimmedValue,
              value: trimmedValue,
              index,
            });
            return newElements;
          });
        }

        setCurrentValue("");
      }
    },
    ref
  );

  const handleTagDel = (index: string) => {
    const newElements = (prevElements: TagElement[]) =>
      prevElements.filter((element: TagElement) => element.index !== index);

    setElements(newElements);
  };

  const handleTagChange = (index: string, newTag: string) => {
    const newElements = (prevElements: TagElement[]) =>
      prevElements
        .filter((element: TagElement) => element.name !== newTag)
        .map((element: TagElement) => {
          if (element.index === index) {
            return { ...element, name: newTag };
          }

          return element;
        })
        .filter((element: TagElement) => element.name !== "");

    setElements(newElements);
  };

  const handleMainInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes(",")) {
      const newValues = new Set(e.target.value.split(","));
      const newElements: TagElement[] = [];

      newValues.forEach((value: string) => {
        const trimmedValue = value.trim();
        const index = `${trimmedValue}-${elements.length}`;

        if (
          elements.find(
            (element: TagElement) => element.name === trimmedValue
          ) ||
          trimmedValue === ""
        ) {
          return;
        }

        newElements.push({ name: trimmedValue, value: trimmedValue, index });
      });

      setElements((prevElements: TagElement[]) => {
        return [...prevElements, ...newElements];
      });

      return;
    }

    setCurrentValue(e.target.value);
  };

  const copyAllHandler = () => {
    copyCallback && copyCallback();

    navigator.clipboard.writeText(
      elements.map((element: TagElement) => element.name).join(",")
    );
  };

  const delAllHandler = () => {
    setElements([]);
  };

  useEffect(() => {
    if (
      areArraysEqual(
        elements.map((element) => element.name),
        initialTags
      )
    )
      return;

    onChange && onChange(elements.map((element: TagElement) => element.name));
  }, [elements]);

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
      copyHandler={elements.length > 0 ? copyAllHandler : undefined}
      delHandler={elements.length > 1 ? delAllHandler : undefined}
      {...rest}
      data-cy={dataCy}
    >
      <div className={cx(styles.tags)}>
        {elements.map((element: TagElement) => (
          <Tag
            key={element.index}
            index={element.index}
            value={element.value}
            handleTagChange={handleTagChange}
            handleTagDel={handleTagDel}
          />
        ))}
        <div className={cx(styles.tagMainInputContainer)} ref={ref}>
          <Input
            value={currentValue}
            onChange={handleMainInputOnChange}
            className={cx(styles.tagMainInput)}
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
