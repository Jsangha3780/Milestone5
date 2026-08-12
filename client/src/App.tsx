import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('authToken');
  };

  return (
    <div className="app-shell">
      {token ? (
        <HomePage token={token} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
