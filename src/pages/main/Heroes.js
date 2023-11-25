import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Heroes.css';

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.opendota.com/api/heroStats');
        setHeroes(response.data);
      } catch (error) {
        console.error('Error fetching Heroes:', error);
      }
    };

    fetchData();
  }, []);

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
    }
  };

  const filteredHeroes = heroes.filter((hero) =>
    hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='heroes-container'>
      <input
        className='heroes-search-bar'
        type="text"
        placeholder="Search heroes by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={onSearch}
      />

      {searchTerm && <h3 className="heroes-title">Search: {searchTerm}</h3>}

      <ul className='heroes-list'>
        {filteredHeroes.map((hero) => (
          <li key={hero.id} className='heroes-list-item'>
            <Link to={`detail/${hero.id}`}>
              <img src={`https://api.opendota.com${hero.img}`} alt={hero.localized_name} className='hero-image' />
              <p className='hero-title'>{hero.localized_name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Heroes;
