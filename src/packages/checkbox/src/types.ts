import type { InputProps } from "@allaround/input";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLInputElement> &
  Pick<InputProps, "onChange"> & {
    children?: React.ReactNode;
    size?: Size;
    checked?: boolean;
    shape?: "round" | "square";
    iconPosition?: "left" | "right";
    text?: string;
    color?: "green" | "blue";
  };

export default Props;
export type { Props };
