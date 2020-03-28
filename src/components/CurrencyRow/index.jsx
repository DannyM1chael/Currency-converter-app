import React from 'react'

export default function CurrencyRow(props) {

    const {
        currencyOption,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props;

    return (
        <div>
            <input type="number" className="input" value={ amount } onChange= { onChangeAmount }/>
            <select value={ selectedCurrency }
                    onChange= { onChangeCurrency }>
                {currencyOption.map((option, index) =>(
                    <option key={ index } value={ option }>{ option }</option>
                ))}
            </select>
        </div>
    )
}
