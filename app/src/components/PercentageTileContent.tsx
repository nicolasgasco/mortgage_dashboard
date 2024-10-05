import { MORTGAGE_MONTH_DURATION } from "../constants/mortgage";
import { ProgressDonut } from "./ProgressDonut"

interface PercentageTileContentProps {
  repaidAmount: number;
}

export const PercentageTileContent = ({ repaidAmount }: PercentageTileContentProps) => {
  const repaidPercentage = (): number => {
    if (Number.isNaN(repaidAmount)) return 0;

    return (repaidAmount / MORTGAGE_MONTH_DURATION) * 100;
  }


  return (
    <ProgressDonut className="w-28" repaidPercentage={repaidPercentage()} />
  )
}