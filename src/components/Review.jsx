import React from "react";
import axios from "axios";
import UpdateReview from "./UpdateReview";
import { baseURL } from "./services/constants";

const Review = (props) => {
  const { author, title, text } = props.review.fields;
  const { fetchReviews, setFetchReviews, review } = props;

  const handleDelete = async () => {
    // the url for airtable must have: the base (database), the table (table), the record in question (rec...)
    const airtableURL = `${baseURL}/${review.id}`;
    // axios delete needs an endpoint (url) options (headers)
    await axios.delete(airtableURL, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
      },
    });
    // refreshing the reviews by firing the useEffect in App.js
    setFetchReviews(!fetchReviews);
  };

  return (
    <div>
      <h4>{title}</h4>
      <h5>{author}</h5>
      <p>{text}</p>
      <UpdateReview
        fetchReviews={fetchReviews}
        setFetchReviews={setFetchReviews}
        review={review}
      />
      <button onClick={handleDelete}>Yeet!</button>
    </div>
  );
};

export default Review;
