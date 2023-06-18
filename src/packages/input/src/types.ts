import { BaseProps, Size } from "../../../utils";

type InputType = "text" | "password" | "email" | "file";

type Props = BaseProps<HTMLInputElement> & {
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
