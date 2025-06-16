import logo from './logo.svg';
import React, {useState} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState([]);
  const [gettingaddress, setGeetingaddress] = useState(null);

  const[fromaddress, setFromaddress] = useState('');
  const[toaddress, setToaddress] = useState('');
  const[transfer, setTransfer] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:3000/api/v1/ripple/getbalance', {
      address: address,
    });

    setBalances(response.data.balances);
  };

  const handleaddress = async(e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:3000/api/v1/ripple/getaddress')

    setGeetingaddress(response.data.result);
  }

  const handletransfer = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/ripple/gettransaction', {
        address1: fromaddress, 
        address2: toaddress 
      })
  
      setTransfer(response.data);
      
    } catch (error) {
      setTransfer({error: "Transfer failed"})
    }
    
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Check XRP Account Balance</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter XRP Address"
        />
        <button type="submit" >
          Submit
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Balances:</h3>
        <ul>
          {balances.map((bal) => (
            <li >
              {bal.currency}: {bal.value} {bal.issuer ? `(Issuer: ${bal.issuer})` : ''}
            </li>
          ))}
        </ul>
      </div>


      <div style={{marginTop: '20px'}}>
          <h1>Generate test address</h1>
          <form onSubmit={handleaddress}>
            <button type="submit">Get address</button>
          </form>
      </div>

      <div style={{marginTop: '20px'}}>
          <h3>Address:</h3>
          {gettingaddress && (
            <ul>
              <li>
                <strong>New Address: </strong>{gettingaddress.wallet.classicAddress}
              </li>
            </ul>
          )}
      </div>

      <div style={{marginTop: '20px'}}>
          <h1>Transfer 10 XRP from one account to another account</h1>
          <form onSubmit={handletransfer}>
            <input
              type="text"
              value={fromaddress}
              onChange={(e) => setFromaddress(e.target.value)}
              placeholder="Enter from address"
            />
            <input
              type="text"
              value={toaddress}
              onChange={(e) => setToaddress(e.target.value)}
              placeholder="Enter to address"
            />
            <button type="submit">Transfer</button>
          </form>
      </div>
        
      
      {transfer && transfer.from && transfer.to &&(
        <div style={{ marginTop: '20px' }}>
          {transfer.error ? (
            <h2>{transfer.error}</h2>
          ) : (
            <div>
              <h4>{transfer.message}</h4>
              <p>
                <strong>From:</strong> {transfer.from.address} -{" "}
                {transfer.from.new_balance.find(bal => bal.currency === "XRP")?.value} XRP
              </p>
              <p>
                <strong>To:</strong> {transfer.to.address} -{" "}
                {transfer.to.new_balance.find(bal => bal.currency === "XRP")?.value} XRP
              </p>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}


export default App;
