import type { ContainerProps } from "@allaround/container";

type Props = Omit<ContainerProps, "alignItems"> & {
  sticky?: boolean;
};

export default Props;
export type { Props };
