import React, { useEffect, useState } from "react";

const CountingNumber = ({ max = 101, interval = 30 }) => {
  const [count, setCount] = useState(1);
  const colors = [
  "#FFA500", // Orange - creative, friendly
  "#FFFFFF", // White - clean, trustworthy
  "#FBC02D",
"#FFFFFF", // Gold-ish Yellow - premium, optimistic
 "#FBC02D", // Gold-ish Yellow - premium, optimistic
];// orange, red, white
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (count >= max) return;

    const countTimer = setInterval(() => {
      setCount((prev) => {
        if (prev + 1 > max) {
          clearInterval(countTimer);
          return prev;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(countTimer);
  }, [count, max, interval]);

  useEffect(() => {
    const colorTimer = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 500); // change color every 700ms

    return () => clearInterval(colorTimer);
  }, []);

  return (
    <span
      style={{
        color: colors[colorIndex],
        fontWeight: "bold",
        fontSize: "3rem",
        transition: "color 0.5s ease-out",
      }}
    >
      {count} + Clients
    </span>
  );
};

export default CountingNumber;
