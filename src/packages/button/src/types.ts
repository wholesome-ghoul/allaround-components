type Props = {
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  transparent?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}

export default Props
