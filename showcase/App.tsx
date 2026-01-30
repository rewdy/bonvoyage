import { Layout } from "./components/layout/Layout.tsx";
import { SectionButtons } from "./components/markup/SectionButtons.tsx";
import { SectionForms } from "./components/markup/SectionForms.tsx";
import { SectionHeadings } from "./components/markup/SectionHeadings.tsx";
import { SectionHeadingsExtended } from "./components/markup/SectionHeadingsExtended.tsx";
import { SectionImages } from "./components/markup/SectionImages.tsx";
import { SectionSemantic } from "./components/markup/SectionSemantic.tsx";
import { SectionTables } from "./components/markup/SectionTables.tsx";
import "./scss/style.scss";

const App = () => {
  return (
    <Layout pageTitle="BonVoyage Showcase">
      <SectionHeadings />
      <SectionHeadingsExtended />
      <SectionSemantic />
      <SectionImages />
      <SectionTables />
      <SectionButtons />
      <SectionForms />
    </Layout>
  );
};

export default App;
