import { useEffect, useState } from 'react';
import "./Todo.css";

export default function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored
      ? JSON.parse(stored).map(task => ({
          ...task,
          priority: task.priority || 'Medium', // Ensure priority exists
        }))
      : [];
  });

  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Medium'); // NEW: priority state

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (text.trim() !== '') {
      setTasks([...tasks, { text, completed: false, priority }]); // Add priority to task
      setText('');
    }
  };

  const toggleTask = index => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container bg-white shadow p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">📝 To-Do List</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter a task"
          className="border px-2 py-1 rounded w-full"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={addTask} className="btn bg-green-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 rounded 
              ${task.completed ? 'bg-green-100 line-through' : 'bg-gray-100'}`}
          >
            <div>
              <span onClick={() => toggleTask(index)} className="cursor-pointer">
                {task.text}
              </span>
              <br />
              <small className={`priority ${task.priority?.toLowerCase?.() || "medium"}`}>
                {task.priority || "Medium"}
              </small>
            </div>
            <button onClick={() => deleteTask(index)} className="text-red-500 text-lg">✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
