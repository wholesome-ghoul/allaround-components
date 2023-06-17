import type { ButtonProps } from "@allaround/button";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> &
  Pick<ButtonProps, "icon"> & {
    children: React.ReactNode[] | React.ReactNode;
    size?: Size;
    selectedIndex?: number;
    popup?: boolean;

    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;

    enableArrow?: boolean;
    activeIndicator?: boolean;
    text?: string;
  };

export default Props;
export type { Props };
