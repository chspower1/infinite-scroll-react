import React, { useEffect, useRef, useState } from "react";

function App() {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setList((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
  return (
    <div className="App">
      <ul style={{ height: "100px", overflow: "scroll" }}>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <div ref={ref}>observe</div>
      </ul>
    </div>
  );
}

export default App;
