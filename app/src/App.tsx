import { useState } from "react";
import "./App.css";
import {
  MORTGAGE_MONTH_DURATION,
  MORTGAGE_START_DATE,
} from "./constants/mortgage";
import { ProgressDonut } from "./components/ProgressDonut";
import { Tile } from "./components/Tile";

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

  const repaidPercentage: number = Number.isNaN(repaidAmount)
    ? 0
    : ((repaidAmount / MORTGAGE_MONTH_DURATION) * 100);

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

  const estimatedEndDate = () => {
    console.log(remainingMonths());
    const today = new Date();
    let estimatedEndDate = new Date();
    estimatedEndDate = new Date(estimatedEndDate.setMonth(today.getMonth() + remainingMonths()));

    console.log(estimatedEndDate.getMonth(), today.getMonth(), estimatedEndDate.getFullYear(), today.getFullYear());

    if (estimatedEndDate.getMonth() === today.getMonth() && estimatedEndDate.getFullYear() && today.getFullYear()) return "This month 🥳";

    return estimatedEndDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <h1 className="mb-12 font-bold">Mortgage dashboard</h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-y-3 gap-x-4">
        <Tile title="Total">
          <p><strong>{MORTGAGE_MONTH_DURATION}</strong> months</p>
        </Tile>
        <Tile title="Elapsed">
          <p><strong>{elapsedMonths}</strong> {elapsedMonths === 1 ? 'month' : 'months'}</p>
        </Tile>
        <Tile title="Repaid">
          <p className="flex gap-1">
            <input
              type="number"
              step="1"
              min="0"
              max={MORTGAGE_MONTH_DURATION}
              value={repaidAmount}
              onChange={onChangeRepaidAmount}
              style={{
                width: '50px'
              }}
            /> {repaidAmount === 1 ? 'month' : 'months'}
          </p>
        </Tile>
        <Tile title="Percentage">
          <div className="w-9/12 mx-auto">
            <ProgressDonut repaidPercentage={repaidPercentage} />
          </div>
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
    </>
  );
}

export default App;
