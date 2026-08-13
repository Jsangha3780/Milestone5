import { useEffect, useState } from "react";
import "./EventList.css";

interface Event {
  event_id: number;
  college_id: number;
  title: string;
}

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/events");
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not get events");
        return;
      }

      setEvents(data);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-page">

      {/* Header */}
      <section className="event-header">
        <h1>Campus Events</h1>
        <p>Browse all upcoming events happening across campus.</p>
      </section>

      {/* Event List */}
      <section className="event-list-section">
        {loading && <p className="status">Loading events...</p>}
        {message && <p className="status error">{message}</p>}

        {!loading && events.length === 0 && !message && (
          <p className="status">No events found.</p>
        )}

        {events.length > 0 && (
          <ul className="event-grid">
            {events.map((event) => (
              <li key={event.event_id} className="event-card">
                <h3>{event.title}</h3>
                <p>College ID: {event.college_id}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}

export default EventList;
