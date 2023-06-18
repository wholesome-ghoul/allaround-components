import { BaseProps, Size } from "../../../utils";

type Option = {
  label: string;
  value: number;
};

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  size?: Size;
  selectedIndex: number;
  setSelectedIndex: (value: number) => void;
  options: Option[];
  maxHeight?: string;
};

export default Props;
export type { Props, Option };
