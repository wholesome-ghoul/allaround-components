import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLVideoElement> & {
  children?: React.ReactNode;
  size?: Size;

  file?: File | null;
  width?: string;
  height?: string;

  maxDuration?: number;

  handleError: ({ text, show }: { text: string; show: boolean }) => void;
  isError?: boolean;
};

export default Props;
export type { Props };
