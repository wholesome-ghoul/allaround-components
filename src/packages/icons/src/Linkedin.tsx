import type { SVGProps } from "react";
import { isIconSize, iconSize, IconSize } from "../../../utils";
type Props = SVGProps<SVGSVGElement> & {
  size: IconSize | string,
};
const SvgLinkedin = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={isIconSize(props.size) ? iconSize[props.size] : props.size}
    height={isIconSize(props.size) ? iconSize[props.size] : props.size}
    fill={"currentColor"}
    viewBox={"0 0 512 512"}
    {...props}
  >
    <path d="M39.5 510.906c-17.586-2.779-31.166-14.476-37.127-31.979C.565 473.617.5 465.891.5 255.927c0-217.5 0-217.5 2.276-224C7.546 18.302 18.38 7.374 31.66 2.79 38.5.427 38.5.427 256 .427s217.5 0 224.251 2.332c13.424 4.637 24.287 15.523 28.948 29.01 2.301 6.658 2.301 6.658 2.301 224.158s0 217.5-2.361 224.34c-4.481 12.979-15.172 23.759-28.639 28.88-6 2.28-6 2.28-221 2.414-118.25.074-217.25-.22-220-.655zm113.178-57.55c1.552-1.139 3.609-3.614 4.57-5.5 1.637-3.209 1.749-11.269 1.75-125.71.002-132.568.278-125.933-5.448-131.219-2.709-2.5-2.709-2.5-36.105-2.788-37.018-.32-37.634-.23-41.485 6.087-1.909 3.13-1.953 5.983-1.956 127.583-.004 122.769.022 124.424 2.002 127.628 3.94 6.375 4.86 6.514 41.172 6.238 31.27-.237 32.8-.337 35.5-2.319zm122.008.621c6.04-3.683 5.767-.328 6.35-78.05.53-70.655.564-71.594 2.821-79.5 3.575-12.522 7.775-20.19 15.11-27.591 9.07-9.151 14.693-11.313 29.533-11.353 10.281-.027 11.435.176 17.651 3.109 8.59 4.052 14.212 9.764 18.39 18.68 6.773 14.457 6.818 15.035 7.418 96.387.541 73.232.541 73.232 3.81 76.5 3.267 3.268 3.267 3.268 37.769 3.556 39.5.329 40.194.214 43.567-7.212 1.741-3.834 1.852-7.995 1.864-70.076.017-84.69-1.057-102.89-7.521-127.5-3.142-11.96-11.783-29.645-18.368-37.59-16.466-19.866-40.33-29.402-73.58-29.402-34.402 0-57.576 9.701-74.588 31.223-3.75 4.743-3.75 4.743-4.08-7.823-.332-12.566-.332-12.566-4.067-15.987-3.736-3.42-3.736-3.42-37.5-3.406-36.916.016-37.033.033-40.985 5.898-2.28 3.383-2.28 3.383-2.278 127.485 0 116.148.113 124.327 1.75 127.602 3.379 6.765 4.75 6.997 41.248 6.995 30.419-.002 32.704-.127 35.686-1.945zM127.5 164.417c10.804-2.28 18.961-6.777 27.03-14.907 7.927-7.986 12.692-16.18 14.93-25.676 4.547-19.29-1.267-38.88-15.536-52.34C131.9 50.718 99.022 50.906 78 71.927c-11.123 11.123-16.376 23.887-16.256 39.5.177 22.981 13.723 42.523 35.02 50.521 11.112 4.173 19.469 4.844 30.736 2.468z" />
  </svg>
);
SvgLinkedin.defaultProps = {
  size: "small",
};
export default SvgLinkedin;