import React from 'react';

export function SummaryTable({ 
  headers = [], 
  children, 
  rows = [],
  className = "" 
}) {
  return (
    <div className={`table-responsive ${className}`}>
      <table>
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.length > 0
            ? rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))
            : children}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
