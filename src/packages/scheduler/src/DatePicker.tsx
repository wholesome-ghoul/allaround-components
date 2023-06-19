import { useEffect, useState } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Select from "@allaround/select";

import styles from "./style.module.scss";

const DatePicker = ({ setTime, date, ...rest }: any) => {
  const [minuteIndex, setMinuteIndex] = useState(() => {
    const minutes = date.getMinutes();

    return Math.floor(minutes / 5);
  });
  const [hourIndex, setHourIndex] = useState(() => {
    const hours = date.getHours();

    return hours;
  });

  useEffect(() => {
    const minutes = minuteIndex * 5;
    const hours = hourIndex;

    setTime({ minutes, hours });
  }, [minuteIndex, hourIndex]);

  return (
    <Container {...rest} className={cx(styles.datepicker)} gap="12px" noGrid>
      <Select
        selectedIndex={hourIndex}
        setSelectedIndex={setHourIndex}
        className={cx(styles.datepickerSelect)}
        options={Array.from({ length: 24 }).map((_, index) => ({
          label: `${index <= 9 ? "0" : ""}${index.toString()}`,
          value: index,
        }))}
        maxHeight="240px"
        size="small"
      />
      <Select
        selectedIndex={minuteIndex}
        setSelectedIndex={setMinuteIndex}
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
