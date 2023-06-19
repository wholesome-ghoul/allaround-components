import { BaseProps, Size } from "../../../utils";

type Props = BaseProps<HTMLImageElement> & {
  children?: React.ReactNode;
  size?: Size;
  src?: string;
  file?: File | null;
  alt?: string;
  width?: string;
  height?: string;

  /**
   * enables delete icon and calls user handler
   */
  removeHandler?: () => void;
};

export default Props;
export type { Props };
