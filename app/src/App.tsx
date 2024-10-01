import { useState } from 'react'
import './App.css'
import { MORTGAGE_AMOUNT, MORTGAGE_DURATION, MORTGAGE_START_DATE } from './constants/mortgage'

function App() {
  const [repaidAmount, setRepaidAmount] = useState(0)

  const formattedStartDate = MORTGAGE_START_DATE.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(MORTGAGE_AMOUNT)

  const formattedRepaidAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(repaidAmount)

  const onChangeRepaidAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    if (isNaN(newValue)) {
      setRepaidAmount(0);
      return;
    }

    if (newValue >= 0 && newValue <= MORTGAGE_AMOUNT) {
      setRepaidAmount(newValue);
    }
  }

  const repaidPercentage = ((repaidAmount / MORTGAGE_AMOUNT) * 100).toFixed(1)

  const elapsedDays = Math.floor((Date.now() - MORTGAGE_START_DATE.getTime()) / (1000 * 60 * 60 * 24))
  const remainingDays = repaidAmount === 0 ? MORTGAGE_DURATION : (MORTGAGE_AMOUNT / repaidAmount)

  return (
    <>
      <h1>Mortgage end calculator</h1>
      <p>Your mortgage started on <strong>{formattedStartDate}</strong> and it amounts to <strong>{formattedAmount}</strong>.</p>
      <label>So far, you repaid:
        <input type="number" step="100" min="0" max={MORTGAGE_AMOUNT} value={repaidAmount} onChange={onChangeRepaidAmount} />
      </label>

      <p>You repaid <strong>{formattedRepaidAmount}</strong>, which constitutes <strong>{repaidPercentage}</strong>% of your mortage.</p>
      <p>Taken into account that <strong>{elapsedDays}</strong> days have elapsed since mortgage start, your mortgage is estimated to be repaid in <strong>{remainingDays}</strong> months.</p>
    </>
  )
}

export default App
