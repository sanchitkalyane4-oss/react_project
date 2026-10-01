import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMatches();
  }, []);

  async function getMatches() {
    setLoading(true);

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true });

    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <Hero />

      <section className="matches">
        <h2>Upcoming Matches</h2>

        {loading && <p>Loading matches...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && matches.length === 0 && (
          <p>No matches available.</p>
        )}

        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.match_date}
            venue={match.venue}
            price={match.price}
            onBook={() => setSelectedMatch(match)}
          />
        ))}
      </section>

      {selectedMatch && (
        <div className="booking">
          <h2>Selected Match</h2>

          <p>
            {selectedMatch.team1} vs {selectedMatch.team2}
          </p>

          <p>Venue: {selectedMatch.venue}</p>

          <p>Ticket Price: ₹{selectedMatch.price}</p>

          <button onClick={() => setSelectedMatch(null)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default App;