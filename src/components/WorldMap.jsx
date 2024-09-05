import React, { useState, useEffect } from 'react';
import svgContent from '../assets/world.svg?raw'; // Import raw to use path info as string
import './WorldMap.css';

const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState('');

  useEffect(() => {
    const mapContainer = document.querySelector('.map-container');
    const paths = mapContainer.querySelectorAll('svg path');

    const handleMouseOver = (event) => {
      const path = event.target;
      const countryName = path.getAttribute('name') || path.getAttribute('class');

      paths.forEach(p => {
        if (p.getAttribute('name') === countryName || p.getAttribute('class') === countryName) {
          p.classList.add('highlight');
        }
      });

      setHoveredCountry(countryName);
    };

    const handleMouseOut = () => {
      paths.forEach(p => p.classList.remove('highlight'));
      setHoveredCountry('');
    };

    paths.forEach(path => {
      path.addEventListener('mouseover', handleMouseOver);
      path.addEventListener('mouseout', handleMouseOut);
    });

    return () => { // Remove up event listeners to avoid memory leaks
      paths.forEach(path => {
        path.removeEventListener('mouseover', handleMouseOver);
        path.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <div className="map-container">
      <div className="country-label">{hoveredCountry}</div>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default WorldMap;