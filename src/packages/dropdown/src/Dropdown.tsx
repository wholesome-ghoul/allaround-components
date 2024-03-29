import { createPortal } from "react-dom";
import cx from "classnames";
import Button from "@allaround/button";
import Text from "@allaround/text";
import Icons from "@allaround/icons";
import Container from "@allaround/container";

import Props from "./types";
import styles from "./style.module.scss";
import StyledDropdown from "./StyledDropdown";
import DropdownItem from "./DropdownItem";

const reactSuspenseHasDropdownItems = (child: any) => {
  return (
    child.props.fallback &&
    Array.isArray(child.props.fallback) &&
    child.props.fallback.every(
      (child: any) => child.type?.name === "DropdownItem"
    )
  );
};

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
  textOnLeft,
  className,
  enableArrow,
  arrowOnLeft,
  arrowDirection,
  popup,
  isOpen,
  setIsOpen,
  activeIndicator,
  dropdownItemsRef,
  paddedItemContainer,
  paddedItem,
  marginedItem,
  marginedItems,
  noDropperBorder,
  variant,
  dropperSize,
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
        className={cx(styles.mainButton, styles[`${variant}Button`], {
          [styles.leftArrowButton]: arrowOnLeft,
        })}
        transparent={popup ? !isOpen : true}
        noBorder={noDropperBorder}
        size={dropperSize}
        fill
      >
        {text && (
          <Text
            size="medium"
            className={cx(styles.text, {
              [styles.textOnLeft]: textOnLeft,
            })}
            oneline={rest.oneline}
            ellipsis={rest.ellipsis}
          >
            {text}
          </Text>
        )}
        {enableArrow && (
          <Icons.ArrowDownIcon
            className={cx(styles.arrow, styles[`${arrowDirection}Arrow`], {
              [styles.open180]: isOpen,
              [styles.open90]: arrowDirection && isOpen,
              [styles.arrowOnLeft]: arrowOnLeft && !textOnLeft,
              [styles.arrowOnLeftWithText]: arrowOnLeft && textOnLeft,
              [styles.arrowOnRight]: !arrowOnLeft,
            })}
          />
        )}
      </Button>
      <DropdownItems
        isOpen={isOpen}
        popup={popup}
        selectedIndex={selectedIndex}
        activeIndicator={activeIndicator}
        dropdownItemsRef={dropdownItemsRef}
        paddedItemContainer={paddedItemContainer}
        paddedItem={paddedItem}
        marginedItem={marginedItem}
        marginedItems={marginedItems}
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
  dropdownItemsRef,
  paddedItemContainer,
  paddedItem,
  marginedItem,
  marginedItems,
}: any) => {
  const elem = (
    <Container
      innerRef={dropdownItemsRef}
      grid={{
        cols: 1,
        rows: Array.isArray(children) ? children?.length : 1,
      }}
      className={cx({
        [styles.popup]: isOpen && popup && children?.length > 0,
        [styles.itemContainerPadding]: paddedItemContainer,
        [styles.itemContainerMargin]: marginedItems,
      })}
    >
      {isOpen &&
        (Array.isArray(children) ? children : [children]).map(
          (child, index) => {
            if (!child) return null;

            const selected = selectedIndex === index;

            let icon = (
              <Icons.DropdownItemIcon
                height="100%"
                width="24px"
                selected={selected}
              />
            );

            if (!Array.isArray(children) || index === children.length - 1) {
              icon = (
                <Icons.DropdownLastItemIcon
                  height="100%"
                  width="24px"
                  selected={selected}
                />
              );
            }

            let isDropdownItem = false;

            if (
              (child && child.type?.name === "DropdownItem") ||
              reactSuspenseHasDropdownItems(child)
            ) {
              isDropdownItem = true;
            }

            return (
              child &&
              (isDropdownItem ? (
                child
              ) : (
                <DropdownItem
                  padded={paddedItem}
                  margined={marginedItem}
                  activeIndicator={activeIndicator}
                  icon={icon}
                  key={index}
                >
                  {child}
                </DropdownItem>
              ))
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
  paddedItemContainer: true,
  paddedItem: false,
  noDropperBorder: false,
  marginedItem: false,
};
Dropdown.displayName = "Dropdown";

Dropdown.Item = DropdownItem;

export default Dropdown;
