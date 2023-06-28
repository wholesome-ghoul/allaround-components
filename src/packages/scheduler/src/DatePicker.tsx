import { useEffect, useState } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Select from "@allaround/select";
import type { OptionProps } from "@allaround/select";

import styles from "./style.module.scss";

const DatePicker = ({ setTime, date, ...rest }: any) => {
  const [minute, setMinute] = useState<OptionProps>(() => {
    const minutes = Math.floor(date.getMinutes() / 5);

    return { label: (minutes * 5).toString(), value: minutes };
  });
  const [hour, setHour] = useState<OptionProps>(() => {
    const hours = date.getHours();

    return { label: hours, value: hours };
  });

  useEffect(() => {
    const minutes = (minute.value as number) * 5;
    const hours = hour.value;

    setTime({ minutes, hours });
  }, [minute, hour]);

  return (
    <Container {...rest} className={cx(styles.datepicker)} gap="12px" noGrid>
      <Select
        selectedOption={hour}
        setSelectedOption={setHour}
        className={cx(styles.datepickerSelect)}
        options={Array.from({ length: 24 }).map((_, index) => ({
          label: `${index <= 9 ? "0" : ""}${index.toString()}`,
          value: index,
        }))}
        maxHeight="240px"
        size="small"
      />
      <Select
        selectedOption={minute}
        setSelectedOption={setMinute}
        className={cx(styles.datepickerSelect)}
        options={Array.from({ length: 12 }).map((_, index) => ({
          label: `${index <= 1 ? "0" : ""}${(index * 5).toString()}`,
          value: index,
        }))}
        maxHeight="240px"
        size="small"
      />
    </Container>
  );
};

export default DatePicker;
