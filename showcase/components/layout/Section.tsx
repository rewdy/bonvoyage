import type React from "react";
import "./Section.scss";

export type SectionProps = {
  label?: React.ReactNode;
  subheading?: React.ReactNode;
  children?: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({
  label,
  subheading,
  children,
}) => {
  return (
    <section className="showcase-section">
      {label && (
        <div>
          <h2 className="showcase-section-label">{label}</h2>
        </div>
      )}
      {subheading && (
        <div>
          <p className="showcase-section-subheading">{subheading}</p>
        </div>
      )}
      {children}
    </section>
  );
};
