"use client";

import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const handleCountUp = () => {
    setCount(count + 1);
  };
  const handleCountDown = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <header>
        <h1>Count-Up App</h1>
        <p>This is a simple count-up app.</p>
      </header>
      <main>
        <p
          className={`flex items-center justify-center p-10 font-bold text-2xl ${
            count < 0 ? "text-blue-100" : "text-black-100"
          }`}
        >
          {count}
        </p>
        <div className="flex items-center justify-center">
          <div className="inline-flex">
            <button
              onClick={handleCountDown}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              onClick={handleCountUp}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <footer>
        <p>Copyright 2026 Count-Up App</p>
      </footer>
    </div>
  );
}
