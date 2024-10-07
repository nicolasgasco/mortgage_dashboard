import { useState } from "react";
import "./App.css";
import {
  MORTGAGE_MONTH_DURATION,
  MORTGAGE_START_DATE,
} from "./constants/mortgage";
import { Tile } from "./components/Tile";
import { RemainingTileContent } from "./components/RemainingTileContent";
import { RepaidTileContent } from "./components/RepaidTileContent";
import { REDEEM_SPEED_LS_KEY, REPAID_AMOUNT_LS_KEY } from "./constants/localStorage";
import { RedeemTileContent } from "./components/RedeemTileContent";
import { PercentageTileContent } from "./components/PercentageTileContent";
import { TargetTileContent } from "./components/TargetTileContent";
import { StartedTileContent } from "./components/StartedTileContent";
import { ElapsedTileContent } from "./components/ElapsedTileContent";
import { TotalTileContent } from "./components/TotalTileContent";
import { CurrentTileContent } from "./components/CurrentTileContent";

const MILLISECONDS_IN_A_MONTH = 1000 * 60 * 60 * 24 * 30.44; // Average month length in milliseconds


function App() {
  const elapsedMonths = (Date.now() - MORTGAGE_START_DATE.getTime()) / MILLISECONDS_IN_A_MONTH;
  const [repaidAmount, setRepaidAmount] = useState(() => {
    const userRepaidAmountRaw = localStorage.getItem(REPAID_AMOUNT_LS_KEY);

    if (userRepaidAmountRaw) {
      return Number(userRepaidAmountRaw);
    }

    return Math.ceil(elapsedMonths);
  });

  const [speed, setSpeed] = useState(() => {
    const userSpeedRaw = localStorage.getItem(REDEEM_SPEED_LS_KEY);

    if (userSpeedRaw) {
      return Number(userSpeedRaw);
    }

    return 1;
  });

  const remainingMonths = (): number => {
    if (repaidAmount === 0) return MORTGAGE_MONTH_DURATION;

    return Math.ceil(
      (MORTGAGE_MONTH_DURATION - repaidAmount) / (repaidAmount / Math.ceil(elapsedMonths))
    );
  };

  const remainingYears = (): number => {
    const result = Math.floor(remainingMonths() / 12);

    return result ?? 0;
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-12 font-bold">Mortgage dashboard</h1>
      <div className="w-full sm:w-auto grid grid-flow-row sm:grid-cols-3 sm:grid-rows-2 gap-y-3 gap-x-4">
        <Tile title="Total">
          <TotalTileContent />
        </Tile>
        <Tile title="Started">
          <StartedTileContent />
        </Tile>
        <Tile title="Elapsed">
          <ElapsedTileContent elapsedMonths={elapsedMonths} />
        </Tile>
        <Tile title="Repaid">
          <RepaidTileContent repaidAmount={repaidAmount} setRepaidAmount={setRepaidAmount} elapsedMonths={elapsedMonths} />
        </Tile>
        <Tile title="Remaining">
          <RemainingTileContent remainingYears={remainingYears()} remainingMonths={remainingMonths()} />
        </Tile>
        <Tile title="Percentage">
          <PercentageTileContent repaidAmount={repaidAmount} />
        </Tile>
        <Tile title="Speed">
          <RedeemTileContent speed={speed} setSpeed={setSpeed} />
        </Tile>
        <Tile title="Current">
          <CurrentTileContent repaidAmount={repaidAmount} elapsedMonths={elapsedMonths} />
        </Tile>
        <Tile title="Target">
          <TargetTileContent repaidAmount={repaidAmount} elapsedMonths={elapsedMonths} speed={speed} />
        </Tile>
      </div >
    </div>);
}

export default App;
