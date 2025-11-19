import React from "react";
import HeatmapTable from "./HeatmapTable";
import TreeTable from "./TreeTable";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Heatmap Supplier Comparison Table</h2>
      <HeatmapTable />

      <hr style={{ margin: "40px 0" }} />

      <h2>Tree Table - Hierarchical Category Data</h2>
      <TreeTable />
    </div>
  );
}
