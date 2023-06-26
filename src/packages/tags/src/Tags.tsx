import { useState, useRef, useEffect } from "react";
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
  onChange,
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
        const trimmedValue = currentValue.trim();
        const newElement = (
          <Tag
            value={trimmedValue}
            key={`${trimmedValue}-${elements.length}}`}
            handleTagChange={handleTagChange}
            handleTagDel={handleTagDel}
          />
        );

        if (
          elements.find(
            (element: TagElement) => element.name === trimmedValue
          ) ||
          trimmedValue === ""
        ) {
          setCurrentValue("");
          return;
        }

        setElements((prevElements: TagElement[]) => {
          const newElements = [...prevElements];
          newElements.push({ name: trimmedValue, elem: newElement });
          return newElements;
        });
        setCurrentValue("");
      }
    },
    ref
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
      const newValues = new Set(e.target.value.split(","));
      const newElements: TagElement[] = [];

      newValues.forEach((value: string) => {
        const trimmedValue = value.trim();

        if (
          elements.find(
            (element: TagElement) => element.name === trimmedValue
          ) ||
          trimmedValue === ""
        ) {
          return;
        }

        const newElement = (
          <Tag
            value={trimmedValue}
            key={`${trimmedValue}-${elements.length}}`}
            handleTagChange={handleTagChange}
            handleTagDel={handleTagDel}
          />
        );

        newElements.push({ name: trimmedValue, elem: newElement });
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

  useEffect(() => {
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
        {elements.map((element: TagElement) => element.elem)}
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
