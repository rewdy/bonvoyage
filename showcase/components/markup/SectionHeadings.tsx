import type React from "react";
import { Section } from "../layout/Section.tsx";

export const SectionHeadings: React.FC = () => {
  return (
    <Section label="Headings">
      <h1>The Art of Visual Harmony</h1>
      <h2>Understanding Typographic Principles</h2>
      <h3>The Golden Ratio in Design</h3>
      <h4>Establishing a Visual Hierarchy</h4>
      <h5>Choosing the Right Typeface</h5>
      <h6>Balancing Elements for Impact</h6>
    </Section>
  );
};
