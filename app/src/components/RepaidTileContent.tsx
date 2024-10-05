import { REPAID_AMOUNT_LS_KEY } from "../constants/localStorage";
import { MORTGAGE_MONTH_DURATION } from "../constants/mortgage";
import { MinusPlusButtons } from "./MinusPlusButtons";

interface RepaidTileContentProps {
  elapsedMonths: number;
  repaidAmount: number;
  setRepaidAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const RepaidTileContent = ({ repaidAmount, setRepaidAmount, elapsedMonths }: RepaidTileContentProps) => {
  const onDecreaseRepaidAmount = () => {
    setRepaidAmount(prev => {
      const newValue = prev <= Math.ceil(elapsedMonths) ? Math.ceil(elapsedMonths) : --prev;
      localStorage.setItem(REPAID_AMOUNT_LS_KEY, newValue.toString());

      return newValue;
    })
  }

  const onIncreaseRepaidAmount = () => {
    setRepaidAmount(prev => {
      const newValue = prev === MORTGAGE_MONTH_DURATION ? MORTGAGE_MONTH_DURATION : ++prev;
      localStorage.setItem(REPAID_AMOUNT_LS_KEY, newValue.toString());

      return newValue;
    })
  }

  return (
    <>
      <p className="mb-2">
        {repaidAmount} {repaidAmount === 1 ? 'month' : 'months'}
      </p>
      <MinusPlusButtons
        onDecrease={onDecreaseRepaidAmount}
        onIncrease={onIncreaseRepaidAmount}
      />
    </>
  )
}