import React, { useEffect, useRef, useState } from "react";

const StatCounter = ({ value, suffix = "", label, duration = 1500 }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      setCount(step >= steps ? value : Math.round((value / steps) * step));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
        {count}
        {suffix}
      </p>
      <p className="text-xs sm:text-sm text-ink-soft/70 uppercase tracking-widest mt-1.5">{label}</p>
    </div>
  );
};

export default StatCounter;
