interface TargetTileContentProps {
  repaidAmount: number;
  elapsedMonths: number;
  speed: number;
}

export const TargetTileContent = ({ repaidAmount, elapsedMonths, speed }: TargetTileContentProps) => {
  return (
    <p className="mb-2">
      {Math.floor(repaidAmount / Math.ceil(elapsedMonths)) >= speed ? 'On track ✅' : 'Lacking ❌'}
    </p>
  )
};