interface HomePageProps {
  token: string;
  onLogout: () => void;
}

function HomePage({ token, onLogout }: HomePageProps) {
  return (
    <main className="home-screen">
      <h1>Campus Event Organizer</h1>

      <p>This is the home page.</p>

      {/* Check that a token exists without displaying the actual token */}
      {token && (
        <p>
          You are successfully logged in.
        </p>
      )}

      {/* Logout button */}
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  );
}

export default HomePage;