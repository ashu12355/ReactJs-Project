import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>TV Shows</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="show-list">
          {shows.map(({ show }) => (
            <div key={show.id} className="show-item">
              <h2>{show.name}</h2>
              {show.image && <img src={show.image.medium} alt={show.name} />}
              <p>{show.genres.join(', ')}</p>
              <Link to={`/show/${show.id}`}>View Summary</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowList;
