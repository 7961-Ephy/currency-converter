import { useState, useEffect } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [current, setCurrent] = useState("EUR");
  const [toCurrent, settoCurrent] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${current}&to=${toCurrent}`
          );
          if (!res.ok) {
            throw new Error("Something went wrong while fetching");
          }
          const data = await res.json();
          console.log(data);
          console.log(data.rates);
          const result = data.rates[toCurrent];
          setConverted(result);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
      if (current === toCurrent) {
        return setConverted(amount);
      }
      fetchCurrency();
    },
    [amount, current, toCurrent]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrent}
        onChange={(e) => settoCurrent(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        OUTPUT: {converted} {toCurrent}
      </p>
    </div>
  );
}
