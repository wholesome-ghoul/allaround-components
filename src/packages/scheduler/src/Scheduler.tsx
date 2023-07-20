import { useState, useRef, useEffect } from "react";
import cx from "classnames";
import Container from "@allaround/container";
import Icons from "@allaround/icons";
import Button from "@allaround/button";
import Text from "@allaround/text";
import hooks from "@allaround/hooks";

import Props from "./types";
import styles from "./style.module.scss";
import StyledScheduler from "./StyledScheduler";
import Calendar from "./Calendar";

const { useEventListener } = hooks;

const getDatePickerDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const paddedDay = day.toString().padStart(2, "0");
  const paddedMonth = month.toString().padStart(2, "0");

  return `${paddedDay}/${paddedMonth}/${year}`;
};

const getDatePickerTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

const Scheduler = ({
  children,
  size,
  gridPosition,
  fill,
  dataCy,
  className,
  setDate,
  initialDate,
  ...rest
}: Props) => {
  const documentRef = useRef<Document>(document);
  const [_date, _setDate] = useState<Date>(() => {
    const date = new Date();
    date.setHours(17);
    date.setMinutes(15);
    return date;
  });

  useEffect(() => {
    const now = new Date();

    if (initialDate) {
      const _initialDate = initialDate > now ? initialDate : now;
      _setDate(new Date(_initialDate));
    }
  }, [initialDate]);

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
    setDate(newDate.getTime());
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
    buttonContainerRef
  );

  useEventListener(
    "click",
    (e: any) => {
      if (schedulerRef?.current && !schedulerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    documentRef
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
          <Text size="medium" styles={{ width: "120px" }}>
            {getDatePickerDate(_date)}
          </Text>
          <Text size="medium" styles={{ width: "60px" }}>
            {getDatePickerTime(_date)}
          </Text>
        </Button>
      </Container>
      {isOpen && (
        <Calendar date={_date} setDate={handleDate} direction={direction} />
      )}
    </StyledScheduler>
  );
};

Scheduler.defaultProps = {
  size: "small",
  dataCy: "scheduler-component",
};

export default Scheduler;
