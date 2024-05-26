import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css'; // Import the CSS file

const Chat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/generate-insight', { prompt: query });
      setResponse(res.data.insight);
    } catch (error) {
      console.error('Error generating insight:', error);
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Ask something about the dataset..."
          className="chat-input"
        />
        <button type="submit" className="chat-button">Ask</button>
      </form>
      {response && (
        <div className="response">
          <h3>Insight:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
