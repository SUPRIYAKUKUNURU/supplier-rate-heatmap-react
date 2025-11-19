import React, { useState } from "react";
import treeData from "./data/treeData.json";

function TreeRow({ node, level }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr
        className="tree-row"
        style={{
          background: level === 0 ? "#e8eaf6" : level === 1 ? "#f4f6ff" : "white",
        }}
        onClick={() => node.children && setOpen(!open)}
      >
        <td className="indent" style={{ paddingLeft: level * 30 }}>
          {node.children && (
            <span className="icon">{open ? "▼" : "▶"}</span>
          )}
          {node.name}
        </td>

        <td>{node.itemCode || "-"}</td>
        <td>{node.quantity || "-"}</td>
        <td>{node.rate || "-"}</td>
      </tr>

      {open &&
        node.children &&
        node.children.map((child, idx) => (
          <TreeRow key={idx} node={child} level={level + 1} />
        ))}
    </>
  );
}

export default function TreeTable() {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Code</th>
            <th>Quantity</th>
            <th>Rate</th>
          </tr>
        </thead>

        <tbody>
          {treeData.map((node, index) => (
            <TreeRow key={index} node={node} level={0} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
