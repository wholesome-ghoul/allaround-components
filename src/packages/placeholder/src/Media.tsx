import Square, { SquareProps } from "./Square";
import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> &
  SquareProps & {
    maxWidth?: string;
    maxHeight?: string;
  };

const Media = ({ maxWidth, maxHeight, ...rest }: Props) => {
  return (
    <Square
      className={styles.media}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      {...rest}
    />
  );
};

export default Media;
