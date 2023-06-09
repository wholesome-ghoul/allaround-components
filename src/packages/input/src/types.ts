import type { TooltipProps } from "@allaround/tooltip";

import { BaseProps, Size } from "../../../utils";

type InputType = "text" | "password" | "email" | "file" | "checkbox";

type Props = BaseProps<HTMLInputElement> & {
  type?: InputType;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: Size;
  isError?: boolean;
  minWidth?: string;
  accept?: string;

  tooltip?: Omit<TooltipProps, "componentRef">;
  required?: boolean;
  setIsError?: (isError: boolean) => void;

  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default Props;
export type { Props };
