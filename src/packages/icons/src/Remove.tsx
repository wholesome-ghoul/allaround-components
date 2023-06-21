import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgRemove = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M226.242 508.943C70.697 490.576-31.415 337.673 10.603 186.045 22.377 143.558 41.82 111.176 76.02 77.09c34.881-34.765 56.922-48.912 99.162-63.648 24.646-8.598 36.386-10.613 69.191-11.874 49.664-1.91 81.032 4.385 123.114 24.706 85.823 41.444 138.164 120.219 143.047 215.289 8.172 159.112-126.726 285.986-284.29 267.38Zm171.89-218.257c7.431-7.432 8.315-11.174 8.315-35.199 0-21.415-1.316-28.509-6.474-34.88-6.473-7.998-6.473-7.998-136.365-8.982-71.44-.54-133.215-.157-137.277.852-15.316 3.806-18.024 10.452-18.024 44.225 0 28.97.66 32.213 7.53 37.025 6.505 4.557 25.659 5.274 140.754 5.274 133.224 0 133.224 0 141.54-8.315z" />
  </svg>
);
SvgRemove.defaultProps = {
  size: "small",
};
export default SvgRemove;
