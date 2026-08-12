import { useState } from "react";

interface EventFormProps {
  token: string;
}

function EventForm({ token }: EventFormProps) {
  // Store event title
  const [title, setTitle] = useState("");

  // Store college ID
  const [collegeId, setCollegeId] = useState("");

  // Store success/error message
  const [message, setMessage] = useState("");

  // Track whether the request is running
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      // Send POST request to Express API
      const response = await fetch("/api/events", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // Send JWT token to the protected backend route
          Authorization: `Bearer ${token}`,
        },

        // Send event information to the backend
        body: JSON.stringify({
          title,
          college_id: Number(collegeId),
        }),
      });

      const data = await response.json();

      // Check for API errors
      if (!response.ok) {
        setMessage(data.message || "Could not create event");
        return;
      }

      // Show success message
      setMessage("Event created successfully!");

      // Clear form after successful creation
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
    <section>
      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>
        {/* Event title */}
        <div>
          <label htmlFor="event-title">
            Event Title
          </label>

          <br />

          <input
            id="event-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            required
          />
        </div>

        <br />

        {/* College ID */}
        <div>
          <label htmlFor="college-id">
            College ID
          </label>

          <br />

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

        <br />

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {/* Success or error message */}
      {message && <p>{message}</p>}
    </section>
  );
}

export default EventForm;