import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  window.ethereum.enable().then(setAccount);

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="outline-primary"
          onClick={() => {
            console.log(account[0]);
            window.web3.eth.sendTransaction({
              to:"0x000000000ce9873e7ba322d68c75bf50d7c7bb76",
              from:account[0],
              value:window.web3.toWei(0.01, "ether"),
              gasPrice:"20000000000",
              gasLimit:"21000"
            }, function(err, transactionHash) {
              if (!err)
                console.log(transactionHash);
            });
          }}
        >{account}</Button>
      </header>
    </div>
  );
}

export default App;


