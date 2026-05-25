import React from 'react';

/**
 * Generic table component.
 * @param {{ columns: { header: string; accessor: string }[]; data: any[] }} props
 */
export const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-white/5 border-b border-white/10 text-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-4 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              {columns.map((col) => (
                <td key={col.accessor} className="p-4 text-sm text-gray-400">
                  {row[col.accessor] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
