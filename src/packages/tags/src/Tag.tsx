import { useState } from "react";
import Button from "@allaround/button";
import Input from "@allaround/input";
import Icons from "@allaround/icons";

import styles from "./style.module.scss";

const Tag = ({ value, handleTagChange, handleTagDel }: any) => {
  return (
    <div className={styles.tagContainer}>
      <Input
        value={value}
        onChange={handleTagChange}
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
