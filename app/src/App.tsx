import { useState } from "react";
import "./App.css";
import {
  MORTGAGE_MONTH_DURATION,
  MORTGAGE_START_DATE,
} from "./constants/mortgage";

const MILLISECONDS_IN_A_MONTH = 1000 * 60 * 60 * 24 * 30.44; // Average month length in milliseconds
const elapsedMonths =
  Math.floor(
    (Date.now() - MORTGAGE_START_DATE.getTime()) / MILLISECONDS_IN_A_MONTH
  ) + 1;

function App() {
  const [repaidAmount, setRepaidAmount] = useState(elapsedMonths);

  const formattedStartDate = MORTGAGE_START_DATE.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const onChangeRepaidAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setRepaidAmount(newValue);
  };

  const repaidPercentage = Number.isNaN(repaidAmount)
    ? (0).toFixed(2)
    : ((repaidAmount / MORTGAGE_MONTH_DURATION) * 100).toFixed(2);

  const remainingMonths = () => {
    if (repaidAmount === 0) return MORTGAGE_MONTH_DURATION;

    return Math.ceil(
      (MORTGAGE_MONTH_DURATION - repaidAmount) / (repaidAmount / elapsedMonths)
    );
  };

  const remainingYears = () => {
    const result = Math.floor(remainingMonths() / 12);

    return result ?? 0;
  };

  return (
    <>
      <h1>Mortgage end calculator</h1>
      <p>
        Your mortgage started on <strong>{formattedStartDate}</strong> and it
        amounts to <strong>{MORTGAGE_MONTH_DURATION}</strong> installments.
      </p>
      <label>
        Insert the number of months you have repaid:
        <input
          type="number"
          step="1"
          min="0"
          max={MORTGAGE_MONTH_DURATION}
          value={repaidAmount}
          onChange={onChangeRepaidAmount}
        />
      </label>

      <p>
        You repaid{" "}
        <strong>{Number.isNaN(repaidAmount) ? 0 : repaidAmount}</strong> months,
        which constitutes <strong>{repaidPercentage}</strong>% of your mortage.
      </p>
      <p>
        Taken into account that <strong>{elapsedMonths}</strong> months have
        elapsed since mortgage start, your mortgage is estimated to be repaid in{" "}
        {remainingYears() > 0 && (
          <span>
            <strong>{remainingYears()}</strong> years
          </span>
        )}
        {remainingMonths() % 12 !== 0 && " and "}
        {remainingMonths() % 12 > 0 && (
          <span>
            <strong>{remainingMonths() % 12}</strong> months
          </span>
        )}
        .
      </p>
    </>
  );
}

export default App;
