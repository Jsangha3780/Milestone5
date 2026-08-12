import { useState } from "react";
import "./App.css";

import HomePage from "./components/HomePage";
import Collegelist from "./components/Collegelist";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import LoginPage from "./components/LoginPage";

function App() {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState<string>("");

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          🎓 Campus Events
        </div>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("events")}>Events</button>
          <button onClick={() => setPage("colleges")}>Colleges</button>
          <button onClick={() => setPage("create")}>Create Event</button>
          <button
            className="login-button"
            onClick={() => setPage("login")}
          >
            Login
          </button>
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

        {page === "create" && <EventForm token={token} />}

        {page === "login" && (
          <LoginPage
            onLogin={(t: string) => {
              setToken(t);
              setPage("home");
            }}
          />
        )}
      </main>

      <footer className="footer">
        <div>
          <h3>🎓 Campus Events</h3>
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