import  { useRef, useState, useEffect } from 'react';
import "./PasswordToggle.css"
export default function PasswordToggle() {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">🔐 Password Toggle Input</h2>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          placeholder="Enter password"
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={() => setVisible(v => !v)}
          className="btn bg-blue-500 text-white"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}
