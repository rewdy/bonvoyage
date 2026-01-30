import type React from "react";
import { Section } from "../layout/Section.tsx";

export const SectionButtons: React.FC = () => {
  return (
    <Section label="Buttons">
      <p>
        <button type="button">Primary Button</button>
        <button type="button" disabled>
          Disabled Button
        </button>
      </p>
      <p>
        {/** biome-ignore lint/a11y/useSemanticElements: it's a demo dumb dumb */}
        <a href="#demo" role="button">
          Link as Button
        </a>
      </p>
      <p>
        <input type="button" value="Input Button" />
        <input type="submit" value="Input Submit" />
        <input type="reset" value="Input Reset" />
      </p>
    </Section>
  );
};
