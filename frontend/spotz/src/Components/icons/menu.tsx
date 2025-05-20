import * as React from "react";
import { SVGProps } from "react";
const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#1f1f1f"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
  </svg>
);
export default Menu;
