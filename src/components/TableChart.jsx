import React from "react";

const TableChart = ({ data, title }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {data.columns.map((column, i) => (
            <th key={i} style={{ border: "1px solid #ccc", padding: "8px" }}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ border: "1px solid #ccc", padding: "8px" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableChart;
