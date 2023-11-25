import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './HeroDetail.css';

function HeroDetail() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.opendota.com/api/heroStats`);
        console.log("API response:", response.data);

        const heroData = response.data.find(hero => hero.id.toString() === id);
        if (heroData) {
          setHero(heroData);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!hero) {
    return <p>Data tidak tersedia</p>;
  }

  return (
    <div className="brawler-detail">
      <img src={`https://api.opendota.com${hero.icon}`} alt={hero.localized_name} className='brawler-image'/> 
      <h2>{hero.localized_name}</h2>
      <h3>Roles: {hero.roles.join(', ')}</h3>
      <p>Primary Attribute: {hero.primary_attr}</p>
      <p>Base Health: {hero.base_health}</p>
      <p>Base Mana: {hero.base_mana}</p>
      <p>Attack Type: {hero.attack_type}</p>
      <p>Base Attack Time: {hero.attack_rate}</p>
      <p>Move Speed: {hero.move_speed}</p>
      <p>Base Armor: {hero.base_armor}</p>
      <p>Legs: {hero.legs}</p>
      {/* Add other details from the OpenDota API response as needed */}
    </div>
  );
}

export default HeroDetail;
