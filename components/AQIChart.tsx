import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { AQIDataPoint } from '../types';

interface AQIChartProps {
  data: AQIDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const aqi = payload[0].value;
    return (
      <div className="bg-zinc-800 border border-yellow-500/50 p-3 rounded-lg shadow-xl shadow-yellow-500/10">
        <p className="text-zinc-400 font-bold mb-1">{`Ngày: ${label}`}</p>
        <p className="text-white font-semibold">
          AQI: <span className="text-yellow-400 text-lg">{aqi}</span>
        </p>
        <p className="text-zinc-500 text-sm">{payload[0].payload.status}</p>
      </div>
    );
  }
  return null;
};

export const AQIChart: React.FC<AQIChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-zinc-900 rounded-xl p-4 border border-zinc-700 shadow-sm">
      <h3 className="text-yellow-500 text-lg font-semibold mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        Biểu đồ biến động AQI theo ngày
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/> {/* Yellow-500 */}
              <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="#71717a" 
            tick={{fill: '#a1a1aa', fontSize: 12}}
            tickMargin={10}
          />
          <YAxis 
            stroke="#71717a" 
            tick={{fill: '#a1a1aa', fontSize: 12}}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={100} stroke="#fbbf24" strokeDasharray="3 3" label={{ position: 'right', value: 'Kém', fill: '#fbbf24', fontSize: 10 }} />
          <ReferenceLine y={150} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: 'Xấu', fill: '#ef4444', fontSize: 10 }} />
          <Area 
            type="monotone" 
            dataKey="aqi" 
            stroke="#eab308" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAqi)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};