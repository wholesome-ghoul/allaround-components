import type { TooltipProps } from "@allaround/tooltip";

import { BaseProps, Size } from "../../../utils";

type InputType = "text" | "password" | "email" | "file" | "checkbox" | "number";

type Props = Partial<Pick<HTMLInputElement, "min">> & BaseProps<HTMLInputElement> & {
  type?: InputType;
  value?: string | number;
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

  icon?: React.ReactNode;
};

export default Props;
export type { Props };
