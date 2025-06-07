
import  { useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/Todo';
import PasswordToggle from './components/PasswordToggle';
import DataFetcher from './components/API Fetcher';
import ScrollToTop from './components/ScrollToTop button';

import "./App.css";
const projectList = [
  { name: 'Counter', component: <Counter /> },
  { name: 'To-Do List', component: <TodoList /> },
  { name: 'Password Toggle', component: <PasswordToggle/> },
  { name: 'Data Fetcher', component: <DataFetcher /> },
  { name: 'Scrolltotop', component: <ScrollToTop /> }
];

export default function App() {
  const [selected, setSelected] = useState('Counter');

  const renderComponent = () => {
    const found = projectList.find(p => p.name === selected);
    return found ? found.component : null;
  };

  return (
    <div className="app-container">
      <nav className="project-nav">
        {projectList.map(p => (
          <button
            key={p.name}
            className={`nav-btn ${selected === p.name ? 'active' : ''}`}
            onClick={() => setSelected(p.name)}
          >
            {p.name}
          </button>
        ))}
      </nav>
      <div className="project-display">
        {renderComponent()}
      </div>
      <ScrollToTop />
    </div>
  );
}
