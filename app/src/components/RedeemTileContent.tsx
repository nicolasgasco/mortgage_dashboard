import { REDEEM_SPEED_LS_KEY } from "../constants/localStorage";
import { MORTGAGE_MONTH_DURATION } from "../constants/mortgage";
import { MinusPlusButtons } from "./MinusPlusButtons";

interface RedeemTileContentProps {
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
}

export const RedeemTileContent = ({ speed, setSpeed }: RedeemTileContentProps) => {
  const onDecreaseSpeed = () => {
    setSpeed(prev => {
      const newValue = prev <= 1 ? 1 : --prev;

      localStorage.setItem(REDEEM_SPEED_LS_KEY, newValue.toString());

      return newValue;
    })
  }

  const onIncreaseSpeed = () => {
    setSpeed(prev => {
      const newValue = prev >= MORTGAGE_MONTH_DURATION ? MORTGAGE_MONTH_DURATION : ++prev;
      localStorage.setItem(REDEEM_SPEED_LS_KEY, newValue.toString());

      return newValue;
    })
  }

  return (
    <>
      <p className="mb-2">
        <strong>{speed}</strong>x {speed !== 1 && 'faster'}
      </p>
      <MinusPlusButtons
        onDecrease={onDecreaseSpeed}
        onIncrease={onIncreaseSpeed}
      /></>
  )
} 