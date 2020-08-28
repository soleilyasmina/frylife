import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Review from './components/Review';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/frylife?Grid%20View`;
      const response = await axios.get(airtableURL, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      setReviews(response.data.records);
    }
    getReviews();
  }, []);

  return (
    <div className="App">
      <div className="review-container">
        {
          reviews.map((review) => (
            <Review review={review} key={review.id} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
