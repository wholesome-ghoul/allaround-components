import { BaseProps, Size } from "../../../utils";

type InputType = "text" | "password" | "email";

type Props = BaseProps & {
  type?: InputType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: Size;
  isError?: boolean;
};

export default Props;
