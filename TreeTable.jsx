import React, { useState } from "react";

// Convert flat data → tree structure
function buildTree(data) {
  const tree = {};

  data.forEach((row) => {
    const {
      Category,
      SubCategory1,
      SubCategory2,
      ItemCode,
      Description,
      Quantity,
      Rate,
    } = row;

    if (!tree[Category]) tree[Category] = {};
    if (!tree[Category][SubCategory1]) tree[Category][SubCategory1] = {};
    if (!tree[Category][SubCategory1][SubCategory2])
      tree[Category][SubCategory1][SubCategory2] = [];

    tree[Category][SubCategory1][SubCategory2].push({
      ItemCode,
      Description,
      Quantity,
      Rate,
    });
  });

  return tree;
}

export default function TreeTable({ data }) {
  const treeData = buildTree(data);
  const [openNodes, setOpenNodes] = useState({});

  const toggle = (key) => {
    setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Category / Sub Categories</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Rate</th>
        </tr>
      </thead>

      <tbody>
        {Object.entries(treeData).map(([cat, sub1]) => (
          <React.Fragment key={cat}>
            {/* CATEGORY ROW */}
            <tr
              className="table-primary"
              style={{ cursor: "pointer" }}
              onClick={() => toggle(cat)}
            >
              <td colSpan="4">
                <strong>📁 {cat}</strong>
              </td>
            </tr>

            {openNodes[cat] &&
              Object.entries(sub1).map(([sc1, sub2]) => (
                <React.Fragment key={sc1}>
                  {/* SUB CATEGORY 1 */}
                  <tr
                    className="table-info"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggle(cat + sc1)}
                  >
                    <td colSpan="4" style={{ paddingLeft: "30px" }}>
                      <strong>📂 {sc1}</strong>
                    </td>
                  </tr>

                  {openNodes[cat + sc1] &&
                    Object.entries(sub2).map(([sc2, items]) => (
                      <React.Fragment key={sc2}>
                        {/* SUB CATEGORY 2 */}
                        <tr
                          className="table-light"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggle(cat + sc1 + sc2)}
                        >
                          <td colSpan="4" style={{ paddingLeft: "60px" }}>
                            <strong>📄 {sc2}</strong>
                          </td>
                        </tr>

                        {openNodes[cat + sc1 + sc2] &&
                          items.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ paddingLeft: "90px" }}>
                                {item.ItemCode}
                              </td>
                              <td>{item.Description}</td>
                              <td>{item.Quantity}</td>
                              <td>{item.Rate}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
