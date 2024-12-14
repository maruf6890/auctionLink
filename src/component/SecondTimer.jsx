import React, { useState, useEffect } from "react";

const SecondTimer = ({ duration }) => {
  const [counter, setCounter] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [duration]);

  return (
    <div >
      <span className="countdown font-mono text-4xl btn bg-slate-400">
        <span style={{ "--value": counter }}></span>
      </span>
    </div>
  );
};

export default SecondTimer;
