import type { TooltipProps } from "@allaround/tooltip";

import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: Size;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  transparent?: boolean;
  disabled?: boolean;
  active?: boolean;
  noBorder?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "success"
    | "info";

  tooltip?: Omit<TooltipProps, "componentRef">;
};

export default Props;
export type { Props };
