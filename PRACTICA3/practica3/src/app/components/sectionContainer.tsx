

import type { ReactNode } from "react";
import "./sectionContainer.css";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
};

export const SectionContainer = ({ children, className = "" }: SectionContainerProps) => {
  return (
    <div className={`section-container ${className}`}>
      {children}
    </div>
  );
};

export default SectionContainer;  