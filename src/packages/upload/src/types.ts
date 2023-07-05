import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  text?: string;
  accept?: string[];
  /**
   * in megabytes
   */
  maxSize?: number;

  setFile: (file: File | null) => void;
  icon?: React.ReactNode;
  noBorder?: boolean;

  setIsError?: (isError: boolean) => void;

  errorText?: string;
  errorShow?: boolean;
};

export default Props;
export type { Props };
