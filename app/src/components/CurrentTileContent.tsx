interface CurrentTileContentProps {
  repaidAmount: number;
  elapsedMonths: number;
}

export const CurrentTileContent = ({ repaidAmount, elapsedMonths }: CurrentTileContentProps) => {
  const paidPerMonth = repaidAmount / Math.ceil(elapsedMonths);
  return (
    <p className="mb-2">
      <strong>{paidPerMonth.toFixed(1)}</strong> {paidPerMonth === 1 ? "payment" : "payments"}/<br />month
    </p>
  )
};