import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Player.css";
import { useParams } from "react-router-dom";

function Player() {
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.opendota.com/api/teams/${id}/players`);
        setPlayers(response.data); // Assuming players is an array in the response
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching player data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>; // You can use a loading spinner here
  }

  if (players.length === 0) {
    return <p>No player data available for this team.</p>;
  }

  return (
    <div className="card-list">
      {players.map(player => (
        <div key={player.account_id} className="player-card">
          <h2 >{player.name || "Unknown"}</h2>
          <p >Games Played: {player.games_played || 0}</p>
          <p >Wins: {player.wins || 0}</p>
          <p >Current Team Member: {player.is_current_team_member !== null ? player.is_current_team_member.toString() : "Unknown"}</p>
          {/* Additional attributes based on your needs */}
        </div>
      ))}
    </div>
  );
}

export default Player;