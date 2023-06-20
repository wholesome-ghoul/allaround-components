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
};

export default Props;
export type { Props };
