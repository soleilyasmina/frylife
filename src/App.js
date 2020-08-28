import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateReview from './components/CreateReview';
import Review from './components/Review';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [fetchReviews, setFetchReviews] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/frylife`;
      const response = await axios.get(airtableURL, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      });
      setReviews(response.data.records);
    }
    getReviews();
  }, [fetchReviews]);

  return (
    <div className="App">
      <div className="review-container">
        {
          reviews.map((review) => (
            <Review
              review={review}
              key={review.id}
              fetchReviews={fetchReviews}
              setFetchReviews={setFetchReviews}
            />
          ))
        }
      </div>
      <CreateReview
        fetchReviews={fetchReviews}
        setFetchReviews={setFetchReviews}
      />
    </div>
  );
}

export default App;
