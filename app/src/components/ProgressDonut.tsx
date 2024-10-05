import { CircularProgressbar } from "react-circular-progressbar";

interface ProgressDonutProps {
  repaidPercentage: number;
}

export const ProgressDonut = ({ repaidPercentage }: ProgressDonutProps): JSX.Element => {
  return (
    <CircularProgressbar
      value={repaidPercentage}
      maxValue={100}
      text={`${repaidPercentage.toFixed(2)}%`}
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
          fontSize: "14px",
          fontWeight: "bold",
        },
        // Customize background - only used when the `background` prop is true
      }}
    />
  )
}