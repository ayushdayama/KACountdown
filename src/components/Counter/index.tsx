import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../../utils/utils";
import "./styles.scss";

type CounterProps = {
  onMinuteComplete: () => void; // New prop to handle minute completion
};

export const Counter = ({ onMinuteComplete }: CounterProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());

      // Check if a full minute has completed (seconds are 00)
      if (timeLeft.seconds === 0) {
        onMinuteComplete();
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onMinuteComplete]); // Add onMinuteComplete to dependencies

  return (
    <div className="counter">
      <div className="counter-item">
        <span className="value">{String(timeLeft.days).padStart(2, "0")}</span>
        <span className="label">Days</span>
      </div>

      <div className="counter-item">
        <span className="value">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="label">Hours</span>
      </div>

      <div className="counter-item">
        <span className="value">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="label">Minutes</span>
      </div>

      <div className="counter-item">
        <span className="value">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="label">Seconds</span>
      </div>
    </div>
  );
};
