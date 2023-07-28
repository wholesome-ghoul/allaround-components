import Line from "./Line";
import styles from "./style.module.scss";
import { BaseProps } from "../../../utils";

type Props = BaseProps<HTMLDivElement> & {
  rows: number;
};

const Paragraph = ({ rows, ...rest }: Props) => {
  return Array.from({ length: rows }).map((_, index) => (
    <Line key={index} className={styles.paragraph} maxWidth="100%" {...rest} />
  ));
};

Paragraph.defaultProps = {
  rows: 1,
};

export default Paragraph;
