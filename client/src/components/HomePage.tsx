interface HomePageProps {
  token: string;
  onLogout: () => void;
}

function HomePage({ token, onLogout }: HomePageProps) {
  return (
    <main className="home-screen">
      <h1>Campus Event Organizer</h1>
      <p>TThis is the home page. It works for now.</p>
      <pre className="token-preview">{token}</pre>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  );
}

export default HomePage;
