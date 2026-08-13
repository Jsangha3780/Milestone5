import { useState } from "react";
import "./EventForm.css";

interface EventFormProps {
  token: string;
}

function EventForm({ token }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          college_id: Number(collegeId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not create event");
        return;
      }

      setMessage("Event created successfully!");
      setTitle("");
      setCollegeId("");
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-page">

      {/* Header */}
      <section className="event-header">
        <h1>Create Event</h1>
        <p>Fill out the form below to add a new campus event.</p>
      </section>

      {/* Form Card */}
      <section className="event-form-card">
        <form onSubmit={handleSubmit} className="event-form">

          {/* Event Title */}
          <div className="form-group">
            <label htmlFor="event-title">Event Title</label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* College ID */}
          <div className="form-group">
            <label htmlFor="college-id">College ID</label>
            <input
              id="college-id"
              type="number"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              placeholder="Enter college ID"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="event-message">{message}</p>}
      </section>

    </div>
  );
}

export default EventForm;
