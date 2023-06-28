import { BaseProps, Size } from "../../../utils";

type Option = {
  label: string;
  value: string | number;
};

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  size?: Size;
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
  options: Option[];
  maxHeight?: string;
};

export default Props;
export type { Props, Option };
