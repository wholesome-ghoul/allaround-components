import type { TextareaProps } from "@allaround/textarea";

type Props = Omit<TextareaProps, "value" | "rows" | "onChange"> & {
  onChange: (values: string[]) => void;
  initialTags?: string[];
};

export default Props;
export type { Props };
