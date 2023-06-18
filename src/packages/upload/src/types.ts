import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  children?: React.ReactNode;
  size?: Size;
  text?: string;
  accept?: string[];
  isError?: boolean;
  handleError: ({ text, show }: { text: string; show: boolean }) => void;
  /**
   * in kilobytes
   */
  maxSize?: number;

  setFile: (file: File | null) => void;
};

export default Props;
export type { Props };
