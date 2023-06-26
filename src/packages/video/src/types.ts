import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLVideoElement> & {
  children?: React.ReactNode;
  size?: Size;

  file?: File | null;
  width?: string;
  height?: string;

  maxDuration?: number;

  setIsError?: (isError: boolean) => void;
  handleRemove: () => void;
};

export default Props;
export type { Props };
