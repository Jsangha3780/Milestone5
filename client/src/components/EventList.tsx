import { useEffect, useState } from "react";

// Defines the structure of an event
interface Event {
  event_id: number;
  college_id: number;
  title: string;
}

function EventList() {
  // Stores the events returned from the API
  const [events, setEvents] = useState<Event[]>([]);

  // Shows loading message while API request is running
  const [loading, setLoading] = useState(true);

  // Stores any error message
  const [message, setMessage] = useState("");

  // Gets events from the Express API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Vite proxy sends this request to localhost:3000
      const response = await fetch("/api/events");

      const data = await response.json();

      // Check if the API returned an error
      if (!response.ok) {
        setMessage(data.message || "Could not get events");
        return;
      }

      // Save events in state
      setEvents(data);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when the component loads
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section>
      <h2>Campus Events</h2>

      {/* Show loading message */}
      {loading && <p>Loading events...</p>}

      {/* Show error message */}
      {message && <p>{message}</p>}

      {/* Show message when there are no events */}
      {!loading && events.length === 0 && !message && (
        <p>No events found.</p>
      )}

      {/* Display events */}
      {events.length > 0 && (
        <div>
          {events.map((event) => (
            <div key={event.event_id}>
              <h3>{event.title}</h3>

              <p>
                College ID: {event.college_id}
              </p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EventList;