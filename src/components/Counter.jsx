import  { useEffect, useState } from 'react';
import './Counter.css'
export default function Counter() {
  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    let interval;
    if (auto) {
      interval = setInterval(() => setCount(c => c + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [auto]);

  return (
    <div className="bg-white shadow p-4 rounded-lg space-y-2">
      <h2 className="text-xl font-bold">Auto-Increment Counter</h2>
      <p className="text-3xl">{count}</p>
      <div className="space-x-2">
        <button onClick={() => setCount(c => c + 1)} className="btn">+</button>
        <button onClick={() => setCount(c => c - 1)} className="btn">-</button>
        <button onClick={() => setCount(0)} className="btn">Reset</button>
        <button onClick={() => setAuto(a => !a)} className="btn bg-indigo-500 text-white">
          {auto ? 'Stop Auto' : 'Start Auto'}
        </button>
      </div>
    </div>
  );
}
