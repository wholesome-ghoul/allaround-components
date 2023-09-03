import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgNewtab = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M49.689 1007.489c-11.878-6.37-26.808-21.3-33.178-33.178C5.612 953.99 4.93 926.724 4.93 512.001c0-414.725.683-441.99 11.582-462.312 23.564-43.937 28.62-44.76 275.131-44.76H512v82.228l-210.751 1.67-210.752 1.67v843.006h843.006l1.67-210.752 1.67-210.75h82.228v220.357c0 246.51-.823 251.567-44.76 275.13-20.322 10.9-47.587 11.583-462.311 11.583s-441.99-.683-462.311-11.582zm492.335-525.513-30.067-30.067 182.209-182.29 182.21-182.29h-193.24v-82.4h154.186c152.973 0 154.294.116 167.967 14.67 13.366 14.227 13.782 19.297 13.782 167.967v153.298h-82.4v-193.24l-182.29 182.21-182.29 182.21Z" />
  </svg>
);
SvgNewtab.defaultProps = {
  size: "small",
};
export default SvgNewtab;
