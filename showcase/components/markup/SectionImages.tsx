import type React from "react";
import { Section } from "../layout/Section.tsx";

export const SectionImages: React.FC = () => {
  return (
    <Section label="Images">
      <p>
        <img
          src="https://picsum.photos/600/400"
          alt="Standalone placeholder"
          width="600"
          height="400"
        />
      </p>
      <figure>
        <img
          src="https://picsum.photos/400/200"
          alt="Placeholder in figure"
          width="400"
          height="200"
        />
        <figcaption>Figure 1: A placeholder image.</figcaption>
      </figure>
    </Section>
  );
};
