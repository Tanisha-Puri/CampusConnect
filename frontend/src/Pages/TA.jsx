import React, { useState } from 'react';
import './TA.css';
import Navbar from '../Components/Navbar';

const TA = () => {
  const [doubt, setDoubt] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const TAs = [
    { name: 'TA 1', email: 'ta1@example.com' },
    { name: 'TA 2', email: 'ta2@example.com' },
    { name: 'TA 3', email: 'ta3@example.com' },
  ];

  const handleDoubtChange = (e) => {
    setDoubt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle doubt submission logic here, such as sending the doubt to a server.
    setSubmitted(true);
    setDoubt('');
  };

  return (
    <div>
      <Navbar/>
      <h1>Teaching Assistants</h1>
      <div className='ta-box'>
        <div className="ta-section">
          
          <ul className="ta-list">
            {TAs.map((ta, index) => (
              <li key={index} className="ta-item">
                <strong>{ta.name}</strong> 
                <a href={`mailto:${ta.email}`} className="ta-email"> ({ta.email})</a>
              </li>
            ))}
          </ul>

          <div className="ask-doubt-section">
            <h3>Ask a Doubt</h3>
            <form onSubmit={handleSubmit} className="doubt-form">
              <textarea
                value={doubt}
                onChange={handleDoubtChange}
                placeholder="Type your doubt here..."
                required
                className="doubt-textarea"
              />
              <button type="submit" className="submit-doubt-button">Submit</button>
            </form>
            {submitted && <p className="doubt-submitted-message">Your doubt has been submitted!</p>}
          </div>
        </div>
        </div>
  
    </div>
  );
};

export default TA;
