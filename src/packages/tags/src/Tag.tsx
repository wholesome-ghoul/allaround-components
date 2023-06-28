import { useState } from "react";
import Button from "@allaround/button";
import Input from "@allaround/input";
import Icons from "@allaround/icons";

import styles from "./style.module.scss";

const Tag = ({ value, index, handleTagChange, handleTagDel }: any) => {
  const [_value, _setValue] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
  };

  const onblur = () => {
    if (value === _value) return;

    handleTagChange(index, _value);
  };

  return (
    <div className={styles.tagContainer}>
      <Input
        value={_value}
        onChange={handleOnChange}
        className={styles.tagInput}
        styles={{
          width: _value.length + 2 + "ch",
          minWidth: "3ch",
          maxWidth: "20ch",
        }}
        tooltip={{
          children: _value,
          preferredPosition: "top",
        }}
        onBlur={onblur}
      />
      <Button
        onClick={() => handleTagDel(index)}
        icon={<Icons.DelIcon />}
        noBorder
      />
    </div>
  );
};

export default Tag;
