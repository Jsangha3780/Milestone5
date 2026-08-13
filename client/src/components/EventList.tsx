import { useEffect, useState } from "react";
import "./EventList.css";

interface Event {
  event_id: number;
  college_id: number;
  title: string;
}

interface EventListProps {
  token?: string;
}

function EventList({ token }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCollegeId, setEditCollegeId] = useState("");

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

  const handleEdit = (event: Event) => {
    setEditingId(event.event_id);
    setEditTitle(event.title);
    setEditCollegeId(event.college_id.toString());
  };

  const handleUpdate = async (eventId: number) => {
    if (!token) {
      setMessage("You must be logged in to edit events");
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          college_id: Number(editCollegeId),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Could not update event");
        return;
      }

      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCollegeId("");
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
                {editingId === event.event_id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Event title"
                    />
                    <input
                      type="number"
                      value={editCollegeId}
                      onChange={(e) => setEditCollegeId(e.target.value)}
                      placeholder="College ID"
                      min="1"
                    />
                    <div className="edit-buttons">
                      <button onClick={() => handleUpdate(event.event_id)} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>{event.title}</h3>
                    <p>College ID: {event.college_id}</p>
                    {token && <button onClick={() => handleEdit(event)} className="edit-btn">Edit</button>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}

export default EventList;
