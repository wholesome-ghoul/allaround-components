import type { TextareaProps } from "@allaround/textarea";

type Props = Omit<TextareaProps, "value" | "rows" | "onChange"> & {
  onChange: (values: string[]) => void;
  initialTags?: string[];

  copyCallback?: () => void;
};

export default Props;
export type { Props };
