interface ElapsedTileContentProps {
  elapsedMonths: number;
}

export const ElapsedTileContent = ({ elapsedMonths }: ElapsedTileContentProps) => {
  return (
    <p><strong>{elapsedMonths.toFixed(1)}</strong> {elapsedMonths === 1 ? 'month' : 'months'}</p>

  )
};