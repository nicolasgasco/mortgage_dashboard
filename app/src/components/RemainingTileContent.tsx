interface RemainingTileContentProps {
  remainingYears: number;
  remainingMonths: number;
}

export const RemainingTileContent = ({ remainingYears, remainingMonths }: RemainingTileContentProps) => {
  if (remainingYears === 0 && remainingMonths === 0) {
    return <p>Repaid in full 🎉</p>
  }

  const areYearsRemaining = remainingYears > 0;
  const areMonthsRemaining = remainingMonths % 12 > 0;

  const netRemainingMonths = remainingMonths % 12;

  const estimatedEndDate = (): string => {
    const today = new Date();
    let estimatedEndDate = new Date();
    estimatedEndDate = new Date(estimatedEndDate.setMonth(today.getMonth() + remainingMonths));

    if (estimatedEndDate.getMonth() === today.getMonth() && estimatedEndDate.getFullYear() === today.getFullYear()) return "This month 🥳";

    return estimatedEndDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <p>
      {areYearsRemaining && (
        <>
          <span>
            <strong>{remainingYears}</strong> {remainingYears === 1 ? "year" : "years"}
          </span>
          <br />
        </>
      )}
      {areMonthsRemaining && (
        <span>
          <strong>{netRemainingMonths}</strong> {netRemainingMonths === 1 ? "month" : "months"}
        </span>
      )}
      <br />
      <span className="text-base">({estimatedEndDate()})</span>
    </p>
  )
}