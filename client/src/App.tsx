import { useState, useEffect } from "react";
import "./App.css";

import HomePage from "./components/HomePage";
import Collegelist from "./components/Collegelist";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import LoginPage from "./components/LoginPage";

function App() {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem("authToken", newToken);
    setPage("home");
  };

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    setPage("home");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          Campus Events
        </div>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("events")}>Events</button>
          <button onClick={() => setPage("colleges")}>Colleges</button>
          {isLoggedIn && (
            <button onClick={() => setPage("create")}>Create Event</button>
          )}
          {isLoggedIn ? (
            <div className="login-status">
              <span>Logged In</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => setPage("login")}
            >
              Login
            </button>
          )}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <HomePage
            onExploreEvents={() => setPage("events")}
            onViewColleges={() => setPage("colleges")}
          />
        )}

        {page === "events" && <EventList />}

        {page === "colleges" && <Collegelist />}

        {page === "create" && (
          isLoggedIn ? (
            <EventForm token={token} />
          ) : (
            <div className="login-required">
              <h2>Login Required</h2>
              <p>You must be logged in to create an event.</p>
              <button className="primary-button" onClick={() => setPage("login")}>
                Go to Login
              </button>
            </div>
          )
        )}

        {page === "login" && (
          <LoginPage
            onLogin={handleLogin}
          />
        )}
      </main>

      <footer className="footer">
        <div>
          <h3>Campus Events</h3>
          <p>
            Discover and manage events happening on campuses.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p onClick={() => setPage("home")}>Home</p>
          <p onClick={() => setPage("events")}>Events</p>
          <p onClick={() => setPage("colleges")}>Colleges</p>
        </div>

        <div>
          <h4>Campus Event Organizer</h4>
          <p>© 2026 Campus Event Organizer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;