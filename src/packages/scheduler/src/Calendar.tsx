import { useMemo, useEffect, useState } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Icons from "@allaround/icons";
import Button from "@allaround/button";
import Text from "@allaround/text";

import styles from "./style.module.scss";
import DatePicker from "./DatePicker";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const getUserTimeZoneOffset = () => {
  const utcOffset = new Date().getTimezoneOffset();
  const offset = utcOffset / 60;
  const sign = offset < 0 ? "+" : "-";
  const hours = Math.abs(Math.floor(offset));
  const paddedHours = hours.toString().padStart(2, "0");
  const offsetString = `UTC${sign}${paddedHours}`;

  return offsetString;
};

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = ({ setDate, date, direction, innerRef }: any) => {
  const { actualDate, actualDay, actualMonth, actualYear } =
    useMemo<any>(() => {
      const actualDate = new Date();
      const actualMonth = actualDate.getMonth();
      const actualYear = actualDate.getFullYear();
      const actualDay = actualDate.getDate();

      return { actualDate, actualDay, actualMonth, actualYear };
    }, []);
  const [selectedDate, setSelectedDate] = useState(date);
  const [viewingDate, setViewingDate] = useState<Date>(date);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const { viewingMonth, viewingYear, totalDays, firstDayOfMonth } =
    useMemo(() => {
      const viewingMonth = viewingDate.getMonth();
      const viewingYear = viewingDate.getFullYear();
      const totalDays = daysInMonth(viewingMonth, viewingYear);
      const firstDayOfMonth = new Date(viewingYear, viewingMonth, 1).getDay();

      return { viewingMonth, viewingYear, totalDays, firstDayOfMonth };
    }, [viewingDate]);

  const [time, setTime] = useState<{ minutes: number; hours: number }>({
    minutes: date.getMinutes(),
    hours: date.getHours(),
  });

  const handleMonthChange = (change: number) => {
    setViewingDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + change)
    );
  };

  const handleSelectedDate = (day: number, month: number, year: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  useEffect(() => {
    setCurrentMonthName(
      viewingDate.toLocaleString("default", { month: "long" })
    );
  }, [viewingDate]);

  useEffect(() => {
    const minutes = time.minutes;
    const hours = time.hours;
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    setDate(minutes, hours, day, month, year);
  }, [time, selectedDate]);

  return (
    <Container
      grid={{
        rows: "repeat(10, minmax(38px, auto))",
        cols: "repeat(7, minmax(38px, auto))",
        gap: "5px",
      }}
      className={cx(styles.calendar, {
        [styles.up]: direction === "up",
        [styles.down]: direction === "down",
      })}
      innerRef={innerRef}
    >
      <Container
        gridPosition={{ colPos: "2/7" }}
        className={cx(styles.monthYear)}
        noGrid
      >
        {currentMonthName} {viewingDate.getFullYear()}
      </Container>

      <Container
        gridPosition={{ colPos: 1, rowPos: 1 }}
        className={cx(styles.arrowContainer, {
          [styles.none]:
            actualDate >
            new Date(viewingDate.getFullYear(), viewingDate.getMonth()),
        })}
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

        if (day > totalDays) return;

        const colPos = ((firstDayOfMonth + index) % 7) + 1;
        const rowPos = Math.floor((firstDayOfMonth + index) / 7) + 3;
        const isCurrentMonth = actualMonth == viewingMonth;
        const isCurrentYear = actualYear === viewingYear;

        const _isPast = () => {
          if (
            new Date(actualYear, actualMonth) <
            new Date(viewingYear, viewingMonth)
          ) {
            return false;
          }

          if (isCurrentMonth) {
            return day < actualDate.getDate();
          }

          return true;
        };
        const isPast = _isPast();

        const isSelected =
          viewingYear === selectedDate.getFullYear() &&
          viewingMonth === selectedDate.getMonth() &&
          day === selectedDate.getDate();

        return (
          <Container
            key={index}
            className={cx(styles.day, {
              [styles.today]:
                isCurrentYear && isCurrentMonth && day === actualDay,
              [styles.past]: isPast,
              [styles.selected]: isSelected,
            })}
            gridPosition={{ colPos, rowPos }}
            onClick={() =>
              !isPast && handleSelectedDate(day, viewingMonth, viewingYear)
            }
            noGrid
          >
            {day}
          </Container>
        );
      })}

      <DatePicker
        gridPosition={{ rowPos: 9, colPos: "1/8" }}
        setTime={setTime}
        date={date}
      />

      <Container
        gridPosition={{ rowPos: 10, colPos: "2/7" }}
        className={cx(styles.timezone)}
        noGrid
      >
        <Text>
          {getUserTimeZoneOffset()} {userTimeZone}
        </Text>
      </Container>
    </Container>
  );
};

export default Calendar;
