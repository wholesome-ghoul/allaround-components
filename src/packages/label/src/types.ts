import { BaseProps, Size } from "../../../utils";

type Props = BaseProps & {
  htmlFor?: HTMLLabelElement["htmlFor"];
  children?: React.ReactNode;
  size?: Size;
};

export default Props;
