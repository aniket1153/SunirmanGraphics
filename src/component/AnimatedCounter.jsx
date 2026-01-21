import { useEffect, useRef, useState } from "react";
import CountingNumber from "./CountingNumber";

const AnimatedCounter = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // restart counter after finish
  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => {
      setCycle((c) => c + 1);
    }, cycle === 0 ? 3000 : 4200); // 2nd run slower

    return () => clearTimeout(timeout);
  }, [cycle, visible]);

  return (
    <div ref={ref}>
      {visible && (
        <CountingNumber
          key={cycle}
          max={101}
          interval={cycle === 0 ? 20 : 35}
        />
      )}
      <span className="text-3xl">+</span>
    </div>
  );
};

export default AnimatedCounter;
