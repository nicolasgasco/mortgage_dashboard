interface MinusPlusButtonsProps {
  onDecrease: () => void,
  onIncrease: () => void
}

export const MinusPlusButtons = ({
  onDecrease,
  onIncrease,
}: MinusPlusButtonsProps): JSX.Element => {
  return (
    <div className="flex w-full gap-2">
      <button type="button" className="bg-slate-500 font-extrabold text-xl px-6 sm:py-0" aria-label="Subtract" onClick={onDecrease}>-</button>
      <button type="button" className="bg-slate-900 font-extrabold text-xl px-6 sm:py-0" aria-label="Add" onClick={onIncrease}>+</button>
    </div>
  )
}