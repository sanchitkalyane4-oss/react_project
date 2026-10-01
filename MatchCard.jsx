function MatchCard({
  team1,
  team2,
  date,
  venue,
  price,
  onBook
}) {
  return (
    <div className="match-card">
      <h2>
        {team1} vs {team2}
      </h2>

      <p>Date: {date}</p>
      <p>Venue: {venue}</p>
      <p>Ticket Price: ₹{price}</p>

      <button onClick={onBook}>
        Book Ticket
      </button>
    </div>
  );
}

export default MatchCard;