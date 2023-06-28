import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLInputElement> & {
  children?: React.ReactNode;
  size?: Size;

  checked?: boolean;
  shape?: "round" | "square";
  onToggle: () => void;

  label?: string;
  labelPosition?: "left";
  labelSize?: Size;
};

export default Props;
export type { Props };
