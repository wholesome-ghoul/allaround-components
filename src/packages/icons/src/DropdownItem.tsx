import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string;
  width?: string;
  height?: string;
  selected?: boolean;
};
const SvgDropdownitem = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={
      props.width
        ? props.width
        : isIconSize(props.size)
        ? iconSize[props.size]
        : props.size
    }
    height={
      props.height
        ? props.height
        : isIconSize(props.size)
        ? iconSize[props.size]
        : props.size
    }
    fill={"currentColor"}
    viewBox={"0 0 187 513"}
    {...props}
  >
    <g transform="translate(-162.19 .5)">
      <circle
        cx={256}
        cy={256}
        r={68.914}
        style={{
          fill: props.selected ? "currentcolor" : "transparent",
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 11.5,
        }}
      />
      <path d="M235.02 430.071v-82.43l-5.733-1.666c-14.018-4.075-28.614-12.752-39.119-23.257-38.08-38.08-37.174-99.095 2.015-135.754 10.91-10.206 26.211-18.97 37.782-21.64l5.055-1.167V-.5h39v163.757l6.696 1.682c23.637 5.937 46.034 23.918 58.217 46.737 21.523 40.313 10.253 91.372-26.262 118.989-9.2 6.957-20.85 12.8-31.172 15.632l-6.98 1.914.39 82.145.388 82.144H235.02Zm38.382-120.763c8.85-2.888 16.547-7.908 23.468-15.307 20.246-21.643 20.246-54.36 0-76.002-11.544-12.34-24.515-17.927-41.35-17.808-8.316.058-11.263.533-17.5 2.823-9.941 3.649-16.288 7.845-23.23 15.355-20.033 21.678-19.703 54.324.767 76.024 14.938 15.835 37.333 21.61 57.845 14.915z" />
    </g>
  </svg>
);
SvgDropdownitem.defaultProps = {
  size: "medium",
  selected: false,
};
export default SvgDropdownitem;
