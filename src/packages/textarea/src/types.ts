import type { ContainerProps } from "@allaround/container";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLTextAreaElement> &
  Pick<ContainerProps, "flex"> & {
    children?: React.ReactNode;
    size?: Size;
    resize?: string;
    width?: string;
    height?: string;
    placeholder?: string;

    htmlFor?: string;
    label?: string;

    rows?: number;

    max?: number;
    current?: number;
    counterIsInside?: boolean;

    copyHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    delHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    value?: string;

    isError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

export default Props;
export type { Props };
