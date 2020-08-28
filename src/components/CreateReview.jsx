import React, { useState } from 'react';
import axios from 'axios';

const CreateReview = (props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('Anonymous');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = {
      title,
      text,
      author
    };
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/frylife`;
    const response = await axios.post(airtableURL, {
      fields
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    console.log(response);
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

export default CreateReview;