import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.opendota.com/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching Teams:', error);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='teams-container'>
      <input
        className='teams-search-bar'
        type="text"
        placeholder="Search teams by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={onSearch}
      />

      {searchTerm && <h3 className="teams-title">Search: {searchTerm}</h3>}

      <ul className='teams-list'>
        {filteredTeams.map((team) => (
          <li key={team.team_id} className='teams-list-item'>
            <Link to={`/player/${team.team_id}`}>
              <div>
                <img src={team.logo_url} alt={team.name} className='teams-image' />
                <p className='teams-title'>{team.name}</p>
                <p>Wins: {team.wins}</p>
                <p>Losses: {team.losses}</p>
                <p>Rating: {team.rating}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
