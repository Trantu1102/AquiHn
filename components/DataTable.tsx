import React from 'react';
import { AQIDataPoint } from '../types';

interface DataTableProps {
  data: AQIDataPoint[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-sm">
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950/50 text-zinc-300 sticky top-0 z-10 backdrop-blur-md border-b border-zinc-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Ngày</th>
              <th className="px-6 py-4 font-semibold text-center">Chỉ số AQI</th>
              <th className="px-6 py-4 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-zinc-800/80 transition-colors duration-150 group"
              >
                <td className="px-6 py-3 font-medium text-zinc-200">{row.date}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`
                    inline-block px-3 py-1 rounded-full font-bold text-xs w-12
                    ${row.aqi <= 50 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                      row.aqi <= 100 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      row.aqi <= 150 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }
                  `}>
                    {row.aqi}
                  </span>
                </td>
                <td className="px-6 py-3 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};