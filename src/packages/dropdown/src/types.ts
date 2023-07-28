import type { TooltipProps } from "@allaround/tooltip";
import type { ButtonProps } from "@allaround/button";
import type { TextProps } from "@allaround/text";
import {ContainerProps} from "@allaround/container";

import { BaseProps, Size } from "../../../utils";

type Borders = {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

type DropdownItemProps = ContainerProps & {
  children: React.ReactNode[] | React.ReactNode;
  padded?: boolean;
  margined?: boolean;
  activeIndicator?: boolean;
  icon?: ButtonProps["icon"];

  tooltip?: Omit<TooltipProps, "componentRef">;
  borders?: Borders;
};

type Props = BaseProps<HTMLDivElement> &
  Pick<ButtonProps, "icon"> &
  Pick<TextProps, "oneline" | "ellipsis"> & {
    children: React.ReactNode[] | React.ReactNode;
    size?: Size;
    dropperSize?: Size;
    selectedIndex?: number;
    popup?: boolean;
    noDropperBorder?: boolean;

    variant?: "primary" | "secondary" | "tertiary";

    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;

    activeIndicator?: boolean;

    dropdownItemsRef?: React.MutableRefObject<HTMLDivElement | null>;

    paddedItemContainer?: boolean;
    paddedItem?: boolean;
    marginedItem?: boolean;
    /**
     * add margin to dropdown items container
     */
    marginedItems?: boolean;

    enableArrow?: boolean;
    arrowOnLeft?: boolean;
    arrowDirection?: "right";

    text?: string;
    textOnLeft?: boolean;
  };

export default Props;
export type { Props, DropdownItemProps };
