import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => {
        setShow(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching show details:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('userDetails', JSON.stringify(formData));
    alert('Ticket booked successfully!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!show) {
    return <div>No show found</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.medium} alt={show.name} />}
      <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
      <form onSubmit={handleSubmit}>
        <h2>Book a Ticket</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default ShowDetail;
