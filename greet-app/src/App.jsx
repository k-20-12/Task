import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false); // To track button click

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = async () => {
    setClicked(true); // Start flower animation on button click

    // Reset clicked state after animation duration
    setTimeout(() => setClicked(false), 1000);

    if (!name) {
      setError('Name is required.');
      setGreeting('');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/greet?name=${name}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setGreeting('');
      } else {
        setGreeting(data.message);
        setError('');
      }
    } catch (error) {
      setError('An error occurred.');
      setGreeting('');
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Greeting App</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleInputChange}
        />
        <button className={`flower-button ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
          Get Greeting
        </button>
        {error && <p className="error">{error}</p>}
        {greeting && <p className="greeting">{greeting}</p>}
      </div>
    </div>
  );
}

export default App;
