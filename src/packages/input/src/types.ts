import { BaseProps, Size } from "../../../utils";

type InputType = "text" | "password" | "email";

type Props = BaseProps & {
  type?: InputType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: Size;
  isError?: boolean;
  minWidth?: string;
};

export default Props;
export type { Props };
