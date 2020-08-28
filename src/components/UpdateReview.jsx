import React, { useState } from 'react';
import axios from 'axios';

const UpdateReview = (props) => {
  const [title, setTitle] = useState(props.review.fields.title);
  const [text, setText] = useState(props.review.fields.text);
  const [author, setAuthor] = useState(props.review.fields.author);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = {
      title,
      text,
      author
    };
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/frylife/${props.review.id}`;
    // await axios.put(url, data, options (headers))
    await axios.put(airtableURL, { fields }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    props.setFetchReviews(!props.fetchReviews);
  }

  // (label+input)*3 with emmet
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        name="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <label htmlFor="text">Text:</label>
      <textarea
        name="text"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <label htmlFor="author">Author:</label>
      <input
        name="author"
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <button type="submit">Fry Me Cap'n</button>
    </form>
  )
}

export default UpdateReview;