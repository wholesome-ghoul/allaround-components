import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  variant: "success" | "alert" | "warning" | "info";

  heading?: React.ReactNode;
  content?: React.ReactNode;

  position: "top" | "bottom" | "top-right";
  withTimer?: boolean;

  onClose?: () => void;
};

export default Props;
export type { Props };
