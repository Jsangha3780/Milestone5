import { useEffect, useState } from "react";

// Defines the structure of a college
interface College {
  college_id: number;
  name: string;
  created_at?: string;
}

function CollegeList() {
  // Stores colleges returned from the API
  const [colleges, setColleges] = useState<College[]>([]);

  // Shows loading state while fetching data
  const [loading, setLoading] = useState(true);

  // Stores error messages
  const [message, setMessage] = useState("");

  // Fetch colleges from the Express API
  const fetchColleges = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Vite proxy forwards this to Express on port 3000
      const response = await fetch("/api/colleges");

      const data = await response.json();

      // Check if the API returned an error
      if (!response.ok) {
        setMessage(data.message || "Could not get colleges");
        return;
      }

      // Store the colleges
      setColleges(data);
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch colleges when the component loads
  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <section>
      <h2>Colleges</h2>

      {/* Loading message */}
      {loading && <p>Loading colleges...</p>}

      {/* Error message */}
      {message && <p>{message}</p>}

      {/* No colleges found */}
      {!loading && colleges.length === 0 && !message && (
        <p>No colleges found.</p>
      )}

      {/* Display colleges */}
      {colleges.length > 0 && (
        <ul>
          {colleges.map((college) => (
            <li key={college.college_id}>
              <strong>{college.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CollegeList;