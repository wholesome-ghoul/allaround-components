import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  setDate: (date: Date | number) => void;
  initialDate?: Date | number;
};

export default Props;
export type { Props };
