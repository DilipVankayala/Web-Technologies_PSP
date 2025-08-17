import React, { useState } from "react";

export default function ClickCounter() {
  // State to hold the count
  const [count, setCount] = useState(0);

  // Function to handle button click
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Button Click Counter</h2>
      <p>You clicked the button <strong>{count}</strong> times.</p>
      <button onClick={handleClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Click Me
      </button>
    </div>
  );
}