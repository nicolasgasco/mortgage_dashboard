import { MORTGAGE_START_DATE } from "../constants/mortgage";

export const StartedTileContent = () => {
  return (
    <p>
      {MORTGAGE_START_DATE.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })}
    </p>
  )
};