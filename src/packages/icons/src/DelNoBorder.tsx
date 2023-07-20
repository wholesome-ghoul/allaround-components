import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgDelNoBorder = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M39.208 501.88c-21.424-9.733-37.102-33.771-37.102-56.886 0-23.588 3.718-28.398 85.643-110.766l79.123-79.55-79.159-79.5C5.683 92.795 2.106 88.169 2.106 64.464c0-31.972 30.677-62.49 62.742-62.414 23.362.055 28.206 3.813 110.37 85.624l79.5 79.159 79.55-78.898c82.17-81.495 87.919-85.94 111.11-85.885 33.01.077 61.956 29.238 61.956 62.414 0 25.521-7.298 35.172-87.665 115.924l-75.612 75.974 76.065 75.736c97.542 97.12 106.438 116.873 70.09 155.635-37.69 40.195-60.353 30.496-158.075-67.65L256.4 344.017l-75.974 75.612C88.804 510.815 75.689 518.453 39.208 501.88z" />
  </svg>
);
SvgDelNoBorder.defaultProps = {
  size: "small",
};
export default SvgDelNoBorder;
