import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  window.ethereum.enable().then(setAccount);
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="outline-primary">{account}</Button>
      </header>
    </div>
  );
}

export default App;


