import React from "react";
import heatmapData from "./data/heatmapData.json";

function getHeatColor(value, min, max) {
  if (value === min) return "rgb(0, 180, 0)";  
  if (value === max) return "rgb(230, 0, 0)";  

  const ratio = (value - min) / (max - min);

  if (ratio > 0.35 && ratio < 0.65) {
    return "rgb(255, 230, 0)"; 
  }

  const r = Math.floor(255 * ratio);
  const g = Math.floor(255 * (1 - ratio));
  return `rgb(${r}, ${g}, 0)`;
}

export default function HeatmapTable() {
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Material</th>

            {/* Supplier columns first */}
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i}>Supplier {i} (Rate)</th>
            ))}

            {/* Quantity & Estimated Rate moved to last */}
            <th>Quantity</th>
            <th>Estimated Rate</th>
          </tr>
        </thead>

        <tbody>
          {heatmapData.map((row, idx) => {
            const supplierRates = [row.s1, row.s2, row.s3, row.s4, row.s5];
            const min = Math.min(...supplierRates);
            const max = Math.max(...supplierRates);

            return (
              <tr key={idx}>
                <td>{row.itemCode}</td>
                <td>{row.material}</td>

                {/* Supplier rate heatmap cells */}
                {supplierRates.map((rate, i) => {
                  const diff = (
                    ((rate - row.estimatedRate) / row.estimatedRate) *
                    100
                  ).toFixed(1);

                  return (
                    <td
                      key={i}
                      className="heat-cell"
                      style={{ backgroundColor: getHeatColor(rate, min, max) }}
                    >
                      ₹{rate}
                      <div style={{ fontSize: "12px", fontWeight: "400" }}>
                        ({diff}%)
                      </div>
                    </td>
                  );
                })}

                {/* Moved to last */}
                <td>{row.quantity}</td>
                <td>{row.estimatedRate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
 