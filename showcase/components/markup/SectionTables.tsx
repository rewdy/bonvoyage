import type React from "react";
import { Section } from "../layout/Section.tsx";

const tables = [
  {
    label: "Simple Table",
    class: "",
  },
  {
    label: "Hover Table",
    class: "hover",
  },
  {
    label: "Lined Table",
    class: "lined",
  },
  {
    label: "Striped Table",
    class: "striped",
  },
  {
    label: "Inline Table",
    class: "inline",
  },
];

export const SectionTables: React.FC = () => {
  return (
    <Section label="Tables">
      {tables.map((table) => (
        <table key={table.label} className={table.class}>
          <caption>{table.label}</caption>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wireless Mouse</td>
              <td>Electronics</td>
              <td>142</td>
            </tr>
            <tr>
              <td>Notebook Set</td>
              <td>Stationery</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Coffee Mug</td>
              <td>Kitchenware</td>
              <td>256</td>
            </tr>
            <tr>
              <td>USB Cable</td>
              <td>Electronics</td>
              <td>312</td>
            </tr>
            <tr>
              <td>Desk Lamp</td>
              <td>Furniture</td>
              <td>47</td>
            </tr>
            <tr>
              <td>Pen Pack</td>
              <td>Stationery</td>
              <td>198</td>
            </tr>
            <tr>
              <td>Water Bottle</td>
              <td>Kitchenware</td>
              <td>73</td>
            </tr>
            <tr>
              <td>Keyboard</td>
              <td>Electronics</td>
              <td>64</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total Items</td>
              <td>1,181</td>
            </tr>
          </tfoot>
        </table>
      ))}
    </Section>
  );
};
