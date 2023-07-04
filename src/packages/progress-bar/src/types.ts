import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  progress: number;
  maxProgress: number;
  onProgressComplete?: () => void;
};

export default Props;
export type { Props };
