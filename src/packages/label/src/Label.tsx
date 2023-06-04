import Props from "./types";
import styles from "./style.module.scss";
import StyledLabel from "./StyledLabel";

const Label = ({ children, size, gridPosition, className, htmlFor }: Props) => {
  const styledProps = { ...gridPosition };

  return (
    <StyledLabel
      className={className}
      htmlFor={htmlFor}
      {...styledProps}
      data-cy="label"
    >
      {children}
    </StyledLabel>
  );
};

Label.defaultProps = {
  size: "small",
};

export default Label;
