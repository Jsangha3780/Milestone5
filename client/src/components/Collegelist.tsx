import { useEffect, useState } from "react";
import "./Collegelist.css";

interface College {
  college_id: number;
  name: string;
  created_at?: string;
}

function Collegelist() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchColleges = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/colleges");
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not get colleges");
        return;
      }

      setColleges(data);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <div className="college-page">

      {/* Header */}
      <section className="college-header">
        <h1>Colleges</h1>
        <p>Browse all colleges participating in campus events.</p>
      </section>

      {/* List Section */}
      <section className="college-list-section">
        {loading && <p className="status">Loading colleges...</p>}
        {message && <p className="status error">{message}</p>}

        {!loading && colleges.length === 0 && !message && (
          <p className="status">No colleges found.</p>
        )}

        {colleges.length > 0 && (
          <ul className="college-grid">
            {colleges.map((college) => (
              <li key={college.college_id} className="college-card">
                <strong>{college.name}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}

export default Collegelist;