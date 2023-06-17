import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgArrowdown = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path
      d="m500.824 366.768-191.718-245.96c-14.307-18.373-37.502-18.373-51.808 0-14.305 18.373-14.305 48.163 0 66.54l215.783 276.83c7.623 9.79 17.763 14.196 27.743 13.552 9.983.644 20.122-3.762 27.746-13.553l215.782-276.83c14.307-18.375 14.307-48.163 0-66.538-14.308-18.375-37.502-18.374-51.806 0z"
      transform="translate(-244.826 -36.41)"
    />
  </svg>
);
SvgArrowdown.defaultProps = {
  size: "small",
};
export default SvgArrowdown;
