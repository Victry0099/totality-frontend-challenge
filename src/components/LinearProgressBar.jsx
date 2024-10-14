// LinearProgressBar.js
import React, { useEffect, useRef, useState } from "react";

const LinearProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress((prev) => prev + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-1 bg-gray-200 rounded">
      <div
        className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-100 ease-in-out"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-0 left-0 h-full bg-red-500 opacity-50 transition-all duration-100 ease-in-out"
        style={{ width: `${buffer}%` }}
      />
    </div>
  );
};

export default LinearProgressBar;
