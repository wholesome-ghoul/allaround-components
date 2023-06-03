import Props from "./types";
import styles from "./style.module.scss";
import StyledInput from "./StyledInput";

const Input = ({
  children,
  size,
  gridPosition,
  className,
}: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledInput
      className={className}
      {...styledProps}
    >
      {children}
    </StyledInput>
  );
};

Input.defaultProps = {
  size: "small",
};

export default Input;
