import type React from "react";
import "./Layout.scss";

type LayoutProps = {
  pageTitle?: string;
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <header>
        <div className="liner">
          <h1 className="p">{pageTitle || "BonVoyage Showcase"}</h1>
        </div>
      </header>
      <main>
        <div className="liner">{children}</div>
      </main>
    </>
  );
};
