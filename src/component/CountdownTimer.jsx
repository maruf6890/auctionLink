import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startDate, deadlineDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasDeadlinePassed: false,
  });

  const calculateRemainingTime = () => {
    const now = new Date();
    const deadline = new Date(deadlineDate);
    const remaining = deadline - now;
    
    if (remaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, hasDeadlinePassed: true };
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, hasDeadlinePassed: false };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, deadlineDate]);

  if (timeLeft.hasDeadlinePassed) {
    return <p>Deadline has passed.</p>;
  }

  return (
    <div className="grid m-5 ml-0 grid-flow-col gap-1 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-gray-300 rounded-l-md text-gray-700">
        <span className="countdown font-mono text-2xl">
          {timeLeft.days}
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-gray-300 rounded-md text-gray-700">
        <span className="countdown font-mono text-2xl">
          {timeLeft.hours}
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-gray-300 rounded-md text-gray-700">
        <span className="countdown font-mono text-2xl">
          {timeLeft.minutes}
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-gray-300 rounded-md text-gray-700">
        <span className="countdown font-mono text-2xl">
          {timeLeft.seconds}
        </span>
        sec
      </div>
    </div>
  );
};

export default CountdownTimer;
