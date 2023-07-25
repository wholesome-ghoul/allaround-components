import type { TooltipProps } from "@allaround/tooltip";
import type { ButtonProps } from "@allaround/button";
import type { TextProps } from "@allaround/text";

import { BaseProps, Size } from "../../../utils";

type DropdownItemProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode[] | React.ReactNode;
  padded?: boolean;
  margined?: boolean;
  activeIndicator?: boolean;
  icon?: ButtonProps["icon"];

  tooltip?: Omit<TooltipProps, "componentRef">;
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

    enableArrow?: boolean;
    arrowOnLeft?: boolean;
    arrowDirection?: "right";

    text?: string;
    textOnLeft?: boolean;
  };

export default Props;
export type { Props, DropdownItemProps };
