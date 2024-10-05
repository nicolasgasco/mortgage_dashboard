import { CircularProgressbar } from "react-circular-progressbar";

interface ProgressDonutProps {
  repaidPercentage: number;
  className?: string;
}

const formatPercentage = (percentage: number): string => {
  if (percentage % 1 === 0) return percentage.toFixed(0);

  return percentage.toFixed(2);
}

export const ProgressDonut = ({ className, repaidPercentage }: ProgressDonutProps): JSX.Element => {
  return (
    <div className={className}>
      <CircularProgressbar
        value={repaidPercentage}
        maxValue={100}
        text={`${formatPercentage(repaidPercentage)}%`}
        styles={{
          // Customize the root svg element
          root: {},
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            stroke: "#6f00ed",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Customize transition animation
            transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#aca9ad",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            // Rotate the trail
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          // Customize the text
          text: {
            // Text color
            fill: "#ffffff",
            // Text size
            fontSize: "12px",
            fontWeight: "bold",
          },
          // Customize background - only used when the `background` prop is true
        }}
      />
    </div>
  )
}