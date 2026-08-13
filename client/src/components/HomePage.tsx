interface HomePageProps {
  onExploreEvents: () => void;
  onViewColleges: () => void;
}

import "./HomePage.css";

function HomePage({
  onExploreEvents,
  onViewColleges,
}: HomePageProps) {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            🎓 CAMPUS EVENT ORGANIZER
          </span>

          <h1>
            Discover What's Happening
            <br />
            <span>On Your Campus</span>
          </h1>

          <p>
            Find campus events, connect with your college community,
            and never miss an exciting opportunity.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={onExploreEvents}
            >
              Explore Events →
            </button>

            <button
              className="secondary-button"
              onClick={onViewColleges}
            >
              View Colleges
            </button>
          </div>
        </div>

        <div className="collegestudent-image">
          <img
            src="/src/assets/collegestudents.png"
            alt="Campus event"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything You Need for Campus Events</h2>
          <p>
            Our platform makes it easy to discover, create,
            and manage campus events.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Discover Events</h3>
            <p>
              Browse upcoming campus events and find activities
              that interest you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏫</div>
            <h3>Explore Colleges</h3>
            <p>
              View colleges and discover events happening
              across different campuses.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Create Events</h3>
            <p>
              Organize your own campus event and share it
              with students.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Join the Community</h3>
            <p>
              Connect with students and participate in
              exciting campus activities.
            </p>
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="cta-section">
        <h2>Ready to Discover Your Next Event?</h2>

        <p>
          Explore campus events and find something exciting
          happening near you.
        </p>

        <button
          className="primary-button"
          onClick={onExploreEvents}
        >
          Browse Events →
        </button>
      </section>

    </div>
  );
}

export default HomePage;
