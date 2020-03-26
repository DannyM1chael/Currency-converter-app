import React from 'react'

export default function CurrencyRow(props) {

    const {
        currencyOption,
        selectedCurrency,
        onChangeCurrency
    } = props;

    return (
        <div>
            <input type="number" className="input" />
            <select value={ selectedCurrency }
                    onChange= { onChangeCurrency }>
                {currencyOption.map((option, index) =>(
                    <option key={ index } value={ option }>{ option }</option>
                ))}
            </select>
        </div>
    )
}
