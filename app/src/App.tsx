import { useState } from "react";
import "./App.css";
import {
  MORTGAGE_MONTH_DURATION,
  MORTGAGE_START_DATE,
} from "./constants/mortgage";
import { ProgressDonut } from "./components/ProgressDonut";
import { Tile } from "./components/Tile";
import { MinusPlusButtons } from "./components/MinusPlusButtons";

const MILLISECONDS_IN_A_MONTH = 1000 * 60 * 60 * 24 * 30.44; // Average month length in milliseconds

const LOCAL_STORAGE_KEY = "repaid_amount";

function App() {
  const elapsedMonths = (Date.now() - MORTGAGE_START_DATE.getTime()) / MILLISECONDS_IN_A_MONTH;
  const [repaidAmount, setRepaidAmount] = useState(() => {
    const userRepaidAmountRaw = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (userRepaidAmountRaw) {
      return Number(userRepaidAmountRaw);
    }

    return Math.ceil(elapsedMonths);
  });

  const onDecreaseRepaidAmount = () => {
    setRepaidAmount(prev => {
      const newValue = prev === 0 ? 0 : --prev;
      localStorage.setItem(LOCAL_STORAGE_KEY, newValue.toString());

      return newValue;
    })
  }

  const onIncreaseRepaidAmount = () => {
    setRepaidAmount(prev => {
      const newValue = prev === MORTGAGE_MONTH_DURATION ? MORTGAGE_MONTH_DURATION : ++prev;
      localStorage.setItem(LOCAL_STORAGE_KEY, newValue.toString());

      return newValue;
    })
  }

  const repaidPercentage = (): number => {
    if (Number.isNaN(repaidAmount)) return 0;

    return (repaidAmount / MORTGAGE_MONTH_DURATION) * 100;
  }

  const remainingMonths = (): number => {
    if (repaidAmount === 0) return MORTGAGE_MONTH_DURATION;

    return Math.ceil(
      (MORTGAGE_MONTH_DURATION - repaidAmount) / (repaidAmount / elapsedMonths)
    );
  };

  const remainingYears = (): number => {
    const result = Math.floor(remainingMonths() / 12);

    return result ?? 0;
  };

  const estimatedEndDate = (): string => {
    const today = new Date();
    let estimatedEndDate = new Date();
    estimatedEndDate = new Date(estimatedEndDate.setMonth(today.getMonth() + remainingMonths()));

    if (estimatedEndDate.getMonth() === today.getMonth() && estimatedEndDate.getFullYear() === today.getFullYear()) return "This month 🥳";

    return estimatedEndDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-12 font-bold">Mortgage dashboard</h1>
      <div className="w-full sm:w-auto grid grid-flow-row sm:grid-cols-3 sm:grid-rows-2 gap-y-3 gap-x-4">
        <Tile title="Total">
          <p><strong>{MORTGAGE_MONTH_DURATION}</strong> months</p>
        </Tile>
        <Tile title="Elapsed">
          <p><strong>{elapsedMonths.toFixed(1)}</strong> {elapsedMonths === 1 ? 'month' : 'months'}</p>
        </Tile>
        <Tile title="Repaid">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="flex gap-1">
              {repaidAmount} {repaidAmount === 1 ? 'month' : 'months'}
            </p>
            <MinusPlusButtons
              onDecrease={onDecreaseRepaidAmount}
              onIncrease={onIncreaseRepaidAmount}
            />
          </div>
        </Tile>
        <Tile title="Percentage">
          <ProgressDonut className="w-28" repaidPercentage={repaidPercentage()} />
        </Tile>
        <Tile title="Remaining">
          <p>
            {remainingYears() > 0 && (
              <>
                <span>
                  <strong>{remainingYears()}</strong> years
                </span>
                <br />
              </>
            )}
            {remainingMonths() % 12 > 0 && (
              <span>
                <strong>{remainingMonths() % 12}</strong> months
              </span>
            )}
            {remainingMonths() === 0 && <span>Repaid in full 🎉</span>}
          </p>
        </Tile>
        <Tile title="ETA">
          <p>{estimatedEndDate()}</p>
        </Tile>
      </div >
    </div>);
}

export default App;
