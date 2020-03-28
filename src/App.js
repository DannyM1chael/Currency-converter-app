import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {

    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const defaultCurrency = Object.keys(data.rates)[0]
        setCurrencyOption([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(defaultCurrency)
        setExchangeRate(data.rates[defaultCurrency])
      })
  }, []);

  useEffect(() => {
    if (fromCurrency !=null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(response => response.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  };

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  };


  return (
    <React.Fragment>
      <h1>Converter</h1>
      <CurrencyRow 
        currencyOption={ currencyOption }
        selectedCurrency={ fromCurrency }
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount = { fromAmount }
        onChangeAmount = { handleFromAmountChange }
        />
      <div className="equals"> = </div>
      <CurrencyRow 
        currencyOption={ currencyOption }
        selectedCurrency={ toCurrency }
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount = { toAmount }
        onChangeAmount = { handleToAmountChange }
        />
    </React.Fragment>
  )
}

export default App;
