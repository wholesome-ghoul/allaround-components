import { BaseProps, Size } from "../../../utils";

type InputType = "text";

type Props = BaseProps & {
  type?: InputType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  size?: Size;
};

export default Props;
