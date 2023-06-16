import type { TextareaProps } from "@allaround/textarea";

type Props = Omit<TextareaProps, "value"> & {
  values: string[];
}

export default Props;
export type { Props };
