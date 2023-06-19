import { useEffect, useState, useRef } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Icons from "@allaround/icons";
import Button from "@allaround/button";
import Select from "@allaround/select";
import Text from "@allaround/text";
import hooks from "@allaround/hooks";

import Props from "./types";
import styles from "./style.module.scss";
import StyledScheduler from "./StyledScheduler";

const { useEventListener } = hooks;

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

const Scheduler = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  setDate,
  ...rest
}: Props) => {
  const [_date, _setDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const schedulerRef = useRef<HTMLDivElement>(null);

  const handleDate = (
    minutes: number,
    hours: number,
    day: number,
    month: number,
    year: number
  ) => {
    const newDate = new Date(year, month, day, hours, minutes);
    _setDate(newDate);
    setDate(newDate);
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  useEventListener(
    "click",
    () => {
      if (buttonContainerRef?.current) {
        const { top, bottom } =
          buttonContainerRef.current.getBoundingClientRect();
        const bot = window.innerHeight - bottom;

        if (top > bot) {
          setDirection("up");
        } else {
          setDirection("down");
        }
      }
    },
    buttonContainerRef?.current!
  );

  useEventListener(
    "click",
    (e: any) => {
      if (schedulerRef?.current && !schedulerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    document
  );

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
      ref={schedulerRef}
      gridPosition={gridPosition}
      {...rest}
      data-cy={dataCy}
    >
      <Container
        innerRef={buttonContainerRef}
        className={cx(styles.buttonContainer)}
        noGrid
      >
        <Button
          onClick={toggleCalendar}
          icon={<Icons.SchedulerIcon size="large" />}
        >
          {
            <Text size="medium" styles={{ width: "100px" }}>
              {`${_date?.getDate()}/${_date?.getMonth()}/${_date?.getFullYear()}`}
            </Text>
          }
        </Button>
      </Container>
      {isOpen && <Calendar setDate={handleDate} direction={direction} />}
    </StyledScheduler>
  );
};

const BASE_YEAR = 2023;

const Calendar = ({ setDate, direction, innerRef }: any) => {
  const actualDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(BASE_YEAR);
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState<{ minutes: number; hours: number }>({
    minutes: 0,
    hours: 0,
  });

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
        rows: "repeat(10, minmax(2rem, auto))",
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
        {currentMonthName} {currentYear}
      </Container>

      {actualDate < new Date(BASE_YEAR, currentMonth) && (
        <Container
          gridPosition={{ colPos: 1, rowPos: 1 }}
          className={cx(styles.arrowContainer)}
          noGrid
        >
          <Button
            icon={
              <Icons.ArrowDownIcon style={{ transform: "rotate(90deg)" }} />
            }
            onClick={() => handleMonthChange(-1)}
            className={cx(styles.arrowButton)}
            noBorder
          />
        </Container>
      )}

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

      <DatePicker
        gridPosition={{ rowPos: 9, colPos: "1/8" }}
        setTime={setTime}
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

const DatePicker = (props: any) => {
  const [minuteIndex, setMinuteIndex] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);

  useEffect(() => {
    const minutes = minuteIndex * 5;
    const hours = hourIndex;

    props.setTime({ minutes, hours });
  }, [minuteIndex, hourIndex]);

  return (
    <Container {...props} className={cx(styles.datepicker)} gap="12px" noGrid>
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

Scheduler.defaultProps = {
  size: "small",
  dataCy: "scheduler-component",
};

export default Scheduler;
