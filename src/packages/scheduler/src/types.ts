import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  setDate: (date: Date) => void;
};

export default Props;
export type { Props };
