import logo from './logo.svg';
import React, {useState} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState([]);
  const [gettingaddress, setGeetingaddress] = useState(null);

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
    </div>
  );
}


export default App;
