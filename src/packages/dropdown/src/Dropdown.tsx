import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";
import Button from "@allaround/button";
import Text from "@allaround/text";
import Icons from "@allaround/icons";
import Container from "@allaround/container";

import Props from "./types";
import styles from "./style.module.scss";
import StyledDropdown from "./StyledDropdown";

const Dropdown = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  icon,
  selectedIndex,
  text,
  className,
  enableArrow,
  popup,
  isOpen,
  setIsOpen,
  activeIndicator,
  ...rest
}: Props) => {
  const handleDropdown = () => {
    setIsOpen && setIsOpen(!isOpen);
  };

  return (
    <StyledDropdown
      className={cx(
        styles.dropdown,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Dropdown`],
        className
      )}
      ref={innerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      <Button
        onClick={handleDropdown}
        icon={icon}
        className={cx(styles.mainButton)}
        transparent={popup ? !isOpen : true}
        noBorder
        fill
      >
        {text && <Text size="medium">{text}</Text>}
        {enableArrow && (
          <Icons.ArrowDownIcon
            className={cx(styles.arrow, {
              [styles.rotate]: isOpen,
            })}
          />
        )}
      </Button>
      <DropdownItems
        isOpen={isOpen}
        popup={popup}
        selectedIndex={selectedIndex}
        activeIndicator={activeIndicator}
      >
        {children}
      </DropdownItems>
    </StyledDropdown>
  );
};

const DropdownItems = ({
  children,
  isOpen,
  popup,
  selectedIndex,
  activeIndicator,
}: any) => {
  const elem = (
    <Container
      grid={{
        cols: 1,
        rows: Array.isArray(children) ? children?.length : 1,
      }}
      className={cx(styles.itemContainer, {
        [styles.popup]: isOpen && popup,
      })}
    >
      {isOpen &&
        (Array.isArray(children) ? children : [children]).map(
          (child, index) => {
            const selected = selectedIndex === index;

            if (!Array.isArray(children) || index === children.length - 1) {
              return (
                <div className={cx(styles.item)} key={index}>
                  {activeIndicator && (
                    <Icons.DropdownLastItemIcon
                      height="100%"
                      width="24px"
                      selected={selected}
                    />
                  )}
                  {child}
                </div>
              );
            }

            return (
              <div className={cx(styles.item)} key={index}>
                {activeIndicator && (
                  <Icons.DropdownItemIcon
                    height="100%"
                    width="24px"
                    selected={selected}
                  />
                )}
                {child}
              </div>
            );
          }
        )}
    </Container>
  );

  if (popup) return createPortal(elem, document.body);

  return elem;
};

Dropdown.defaultProps = {
  size: "small",
  dataCy: "dropdown-component",
  popup: false,
  enableArrow: false,
  activeIndicator: false,
  isOpen: false,
};

export default Dropdown;
