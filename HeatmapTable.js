import React from "react";

function getHeatColor(value, min, max) {
  if (max === min) return "rgb(255,255,0)"; // all values equal → yellow

  const ratio = (value - min) / (max - min); // 0 = green, 1 = red

  const r = Math.floor(255 * ratio);
  const g = Math.floor(255 * (1 - ratio));
  return `rgb(${r}, ${g}, 0)`; // green → yellow → red
}

export default function HeatmapTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            {Object.keys(data[0]).map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => {
            const supplierRates = Object.keys(row)
              .filter((k) => k.includes("Supplier"))
              .map((k) => row[k]);

            const minVal = Math.min(...supplierRates);
            const maxVal = Math.max(...supplierRates);

            return (
              <tr key={index}>
                {Object.entries(row).map(([key, value]) => {
                  if (key.includes("Supplier")) {
                    const color = getHeatColor(value, minVal, maxVal);

                    const diff =
                      ((value - row["Estimated Rate"]) /
                        row["Estimated Rate"]) *
                      100;

                    return (
                      <td
                        key={key}
                        style={{
                          background: color,
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {value}
                        <br />
                        <small>({diff.toFixed(1)}%)</small>
                      </td>
                    );
                  }

                  return <td key={key}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
