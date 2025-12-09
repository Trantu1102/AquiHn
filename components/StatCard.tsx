import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl shadow-lg hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-all"></div>
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
          {subtitle && <p className="text-zinc-400 text-xs">{subtitle}</p>}
        </div>
        {icon && <div className="text-yellow-500 p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">{icon}</div>}
      </div>
    </div>
  );
};