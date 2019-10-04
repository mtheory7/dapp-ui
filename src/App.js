import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [account, setAccount] = useState("");
  const [goldBalance, setGoldBalance] = useState(
      "Click to find gold holding amount");
  const [silverBalance, setSilverBalance] = useState(
      "Click to find silver holding amount");
  window.ethereum.enable().then(setAccount);
  const contractABI = [{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"metalName","type":"string"},{"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"updateBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"metalName","type":"string"}],"name":"getMetalBalance","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"metalName","type":"string"}],"name":"MetalBalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

  function sendContract() {
    const contract = new window.web3.eth.Contract(contractABI,
        "0x4a298490e6a90e80b46c451b51ac83702623b046");
    contract.methods.updateBalance("GOLD", "5500000").send({
      from: account[0],
      gasPrice: 20000000000
    }, function (error, result) {
    }).then(console.log);
  }

  function callGetBalance(metalName) {
    const contract = new window.web3.eth.Contract(contractABI,
        "0x4a298490e6a90e80b46c451b51ac83702623b046");
    if (metalName === 'GOLD') {
      contract.methods.getMetalBalance(metalName).call({from: account[0]},
          function (error, result) {
          }).then(setGoldBalance);
    } else if (metalName === 'SILVER') {
      contract.methods.getMetalBalance(metalName).call({from: account[0]},
          function (error, result) {
          }).then(setSilverBalance);
    }
  }

  return (
      <div className="App">
        <header className="App-header">
          <Button variant="outline-primary"
                  onClick={() => {
                    console.log(account[0]);
                    window.web3.eth.sendTransaction({
                      to: "0x000000000ce9873e7ba322d68c75bf50d7c7bb76",
                      from: account[0],
                      value: window.web3.utils.toWei("0.01", "ether"),
                      gasPrice: "20000000000",
                      gasLimit: "21000"
                    }, function (err, transactionHash) {
                      if (!err) {
                        console.log(transactionHash);
                      }
                    });
                  }}
          >{account}</Button>
          <Button variant="outline-primary"
                  onClick={() => {
                    callGetBalance("GOLD")
                  }}
          >{goldBalance}</Button>
          <Button variant="outline-primary"
                  onClick={() => {
                    callGetBalance("SILVER")
                  }}
          >{silverBalance}</Button>
          <Button variant="outline-primary"
                  onClick={() => {
                    sendContract()
                  }}
          >updateBalance(metalName,newAmount)</Button>
        </header>
      </div>
  );
}

export default App;
