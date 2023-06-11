import { BaseProps, Size } from "../../../utils";

type Props = BaseProps & {
  children?: React.ReactNode;
  size?: Size;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  transparent?: boolean;
  disabled?: boolean;
  active?: boolean;
  noBorder?: boolean;
};

export default Props;
export type { Props };
