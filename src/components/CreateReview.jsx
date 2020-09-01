import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../services/constants";

const CreateReview = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("Anonymous");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = {
      title,
      text,
      author,
    };
    // await axios.post(url, data, options (headers))
    await axios.post(
      baseURL,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    props.setFetchReviews(!props.fetchReviews);
    setTitle("");
    setText("");
    setAuthor("");
  };

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
  );
};

export default CreateReview;
