import { createElement } from "react";

export default function Card({ children, className = "", interactive = false, as = "div", ...props }) {
  return createElement(
    as,
    {
      className: ["glass-card", interactive ? "interactive-card" : "", className].join(" "),
      ...props,
    },
    children
  );
}
