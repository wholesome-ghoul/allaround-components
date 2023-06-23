import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDialogElement> & {
  children?: React.ReactNode;
  size?: Size;
  visible?: boolean;
};

export default Props;
export type { Props };
