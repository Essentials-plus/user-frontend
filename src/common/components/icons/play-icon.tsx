import { SVGProps } from "react";

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M45 89C69.3005 89 89 69.3005 89 45C89 20.6995 69.3005 1 45 1C20.6995 1 1 20.6995 1 45C1 69.3005 20.6995 89 45 89Z"
      fill="#CCCCCC"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36.2002 27.4004L62.6002 45.0004L36.2002 62.6004V27.4004Z"
      fill="#CCCCCC"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlayIcon;
