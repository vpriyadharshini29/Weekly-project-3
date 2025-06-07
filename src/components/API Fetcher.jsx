import  { useState, useEffect } from 'react';
import "./APIFetcher.css"
export default function DataFetcher() {
  const [query, setQuery] = useState('octocat');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError('');
    fetch(`https://api.github.com/users/${query}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="bg-white shadow p-4 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">🌐 GitHub User Fetcher</h2>
      <input
        type="text"
        placeholder="Enter GitHub username"
        onChange={e => setQuery(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user && !error && (
        <div className="mt-4">
          <img src={user.avatar_url} alt="avatar" className="w-24 h-24 rounded-full" />
          <p className="font-bold">{user.name || user.login}</p>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Profile</a>
        </div>
      )}
    </div>
  );
}
