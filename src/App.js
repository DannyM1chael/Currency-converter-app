import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import CurrencyRow from './components/CurrencyRow';
import CurrencyTable from './components/CurrencyTable';

const BASE_URL = 'https://api.coincap.io/v2/assets';
const WS = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');
WS.onmessage = function(msg) {
  console.log(msg.data)
}

function App() {

  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
 
  const [coinRates, setCoinRates] = useState([]);

  useEffect(() => {

    fetch(BASE_URL)
      .then(response => response.json())
      .then(rates => {
        getProp(rates)
      })
  }, [])

  function getProp(obj) {
    for (let prop in obj) {
      if (typeof(obj[prop]) === 'object') {
        getProp(obj[prop]);
      }else {
        if ( prop === 'symbol'){
          setCurrencyOption(data => [...data, obj[prop]])
          setFromCurrency(obj[prop][0])
          setToCurrency(obj[prop][0])
        }
      }
    }
  };

  useEffect(() => {
    io(WS).on('event', data => setCoinRates(data))
  });
  
  return (
    <React.Fragment>
      <h1>Converter</h1>
      <CurrencyRow 
        currencyOption={ currencyOption }
        selectedCurrency={ fromCurrency }
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        />
      <div className="equals"> = </div>
      <CurrencyRow 
        currencyOption={ currencyOption }
        selectedCurrency={ toCurrency }
        onChangeCurrency={e => setToCurrency(e.target.value)}
        />
      <CurrencyTable coinRates={ coinRates }/>
    </React.Fragment>
  )
}

export default App;
