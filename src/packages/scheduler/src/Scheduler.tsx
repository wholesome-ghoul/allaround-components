import { useEffect, useState } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Icons from "@allaround/icons";
import Button from "@allaround/button";

import Props from "./types";
import styles from "./style.module.scss";
import StyledScheduler from "./StyledScheduler";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Scheduler = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  innerRef,
  className,
  ...rest
}: Props) => {
  return (
    <StyledScheduler
      className={cx(
        styles.scheduler,
        {
          [styles.fill]: fill,
        },
        styles[`${size}Scheduler`],
        className
      )}
      ref={innerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      <Calendar />
    </StyledScheduler>
  );
};

const BASE_YEAR = 2023;

const Calendar = () => {
  const actualDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(BASE_YEAR);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleMonthChange = (change: number) => {
    setCurrentMonth((prev) => prev + change);
  };

  const handleSelectedDate = (day: number, month: number) => {
    setSelectedDate(new Date(BASE_YEAR, month, day));
  };

  useEffect(() => {
    const newCurrentDate = new Date(BASE_YEAR, currentMonth);

    setCurrentMonthName(
      newCurrentDate.toLocaleString("default", { month: "long" })
    );
    setCurrentYear(newCurrentDate.getFullYear());
  }, [currentMonth]);

  return (
    <Container grid="7x7" gap="5px" className={cx(styles.calendar)}>
      <Container
        gridPosition={{ colPos: "2/7" }}
        className={cx(styles.monthYear)}
        noGrid
      >
        {currentMonthName} {currentYear}
      </Container>

      <Container
        gridPosition={{ colPos: 1, rowPos: 1 }}
        className={cx(styles.arrowContainer)}
        noGrid
      >
        <Button
          icon={<Icons.ArrowDownIcon style={{ transform: "rotate(90deg)" }} />}
          onClick={() => handleMonthChange(-1)}
          className={cx(styles.arrowButton)}
          noBorder
        />
      </Container>

      <Container
        gridPosition={{ colPos: 7, rowPos: 1 }}
        className={cx(styles.arrowContainer)}
        noGrid
      >
        <Button
          icon={<Icons.ArrowDownIcon style={{ transform: "rotate(-90deg)" }} />}
          onClick={() => handleMonthChange(1)}
          className={cx(styles.arrowButton)}
          noBorder
        />
      </Container>

      {weekdays.map((day) => (
        <Container
          key={day}
          className={styles.weekday}
          gridPosition={{ rowPos: 2 }}
          noGrid
        >
          {day}
        </Container>
      ))}

      {Array.from({ length: 42 }).map((_, index) => {
        const day = index + 1;

        const totalDays = daysInMonth(currentMonth, currentYear);

        if (day > totalDays) return;

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        const colPos = ((firstDayOfMonth + index) % 7) + 1;
        const rowPos = Math.floor((firstDayOfMonth + index) / 7) + 3;
        const isCurrentMonth = actualDate.getMonth() === currentMonth;

        const _isPast = () => {
          if (isCurrentMonth) {
            return day < actualDate.getDate();
          }

          if (currentMonth < actualDate.getMonth()) {
            return true;
          }

          return false;
        };
        const isPast = _isPast();

        const isSelected =
          currentYear === selectedDate.getFullYear() &&
          currentMonth % 12 === selectedDate.getMonth() &&
          day === selectedDate.getDate();

        return (
          <Container
            key={index}
            className={cx(styles.day, {
              [styles.today]: isCurrentMonth && day === actualDate.getDate(),
              [styles.past]: isPast,
              [styles.selected]: isSelected,
            })}
            gridPosition={{ colPos, rowPos }}
            onClick={() => !isPast && handleSelectedDate(day, currentMonth)}
            noGrid
          >
            {day}
          </Container>
        );
      })}
    </Container>
  );
};

Scheduler.defaultProps = {
  size: "small",
  dataCy: "scheduler-component",
};

export default Scheduler;
