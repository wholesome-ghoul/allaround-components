import { useState } from "react";
import Button from "@allaround/button";
import Input from "@allaround/input";
import Icons from "@allaround/icons";

import styles from "./style.module.scss";

const Tag = ({ value, handleTagChange, handleTagDel }: any) => {
  const [_value, _setValue] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
    handleTagChange(e.target.value, _value);
  };

  return (
    <div className={styles.tagContainer}>
      <Input
        value={_value}
        onChange={handleOnChange}
        className={styles.tagInput}
      />
      <Button
        onClick={() => handleTagDel(value)}
        icon={<Icons.DelIcon />}
        noBorder
      />
    </div>
  );
};

export default Tag;
