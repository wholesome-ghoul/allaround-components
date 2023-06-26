import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  text?: string;
  accept?: string[];
  /**
   * in kilobytes
   */
  maxSize?: number;

  setFile: (file: File | null) => void;
  icon?: React.ReactNode;
  noBorder?: boolean;

  setIsError?: (isError: boolean) => void;
};

export default Props;
export type { Props };
