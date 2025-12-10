import React, { useState, useMemo } from 'react';
import { HANOI_AQI_DATA } from './constants';
import { AQIChart } from './components/AQIChart';
import { StatCard } from './components/StatCard';
import { DataTable } from './components/DataTable';
import { generateHealthAdvice } from './services/geminiService';
import { AQIDataPoint } from './types';

// Icons
const ActivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const WindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>;
const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const AlertTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;

function App() {
  const [data] = useState<AQIDataPoint[]>(HANOI_AQI_DATA);
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Computed Stats
  const stats = useMemo(() => {
    const latest = data[data.length - 1];
    const totalAQI = data.reduce((acc, curr) => acc + curr.aqi, 0);
    const avgAQI = Math.round(totalAQI / data.length);
    const maxDay = data.reduce((prev, current) => (prev.aqi > current.aqi) ? prev : current);
    
    // Count unhealthy days (AQI > 150)
    const unhealthyDays = data.filter(d => d.aqi > 150).length;

    return { latest, avgAQI, maxDay, unhealthyDays };
  }, [data]);

  const handleAskAI = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setAiAdvice(null);
    try {
      const summary = `Dữ liệu từ ${data[0].date} đến ${data[data.length-1].date}. AQI trung bình: ${stats.avgAQI}. Ngày cao nhất: ${stats.maxDay.date} (${stats.maxDay.aqi}). Có ${stats.unhealthyDays} ngày không lành mạnh.`;
      const advice = await generateHealthAdvice(stats.latest.aqi, summary);
      if (advice) {
        setAiAdvice(advice);
      }
    } catch (err) {
      console.error(err);
      setAiAdvice("Xin lỗi, hiện tại không thể kết nối với chuyên gia AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-zinc-800 text-zinc-100">
      
      {/* Header */}
      <header className="border-b border-zinc-700 bg-zinc-800/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500 border border-yellow-500/20">
              <WindIcon />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Hanoi Air Quest
            </h1>
          </div>
          <div className="text-xs text-zinc-400 font-mono">
            Dữ liệu cập nhật: {stats.latest.date}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Section */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Chất lượng không khí Hà Nội</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Theo dõi chỉ số AQI hàng ngày, phân tích xu hướng và nhận lời khuyên sức khỏe với sự hỗ trợ của AI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="AQI Hôm Nay" 
            value={stats.latest.aqi} 
            subtitle={stats.latest.status} 
            icon={<ActivityIcon />}
          />
          <StatCard 
            title="AQI Trung Bình" 
            value={stats.avgAQI} 
            subtitle="Trong 30 ngày qua" 
            icon={<WindIcon />}
          />
           <StatCard 
            title="Ngày Ô Nhiễm Nhất" 
            value={stats.maxDay.aqi} 
            subtitle={`Ngày ${stats.maxDay.date}`} 
            icon={<AlertTriangle />}
          />
           <StatCard 
            title="Số Ngày Kém/Xấu" 
            value={stats.unhealthyDays} 
            subtitle="AQI > 150" 
            icon={<div className="w-6 h-6 rounded-full bg-red-500/50"></div>}
          />
        </div>

        {/* AI Insight Section - Prominent */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-black/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-500 flex items-center gap-2 mb-2">
                  <BrainIcon />
                  Góc Chuyên Gia AI (Gemini)
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Nhận phân tích chi tiết và lời khuyên sức khỏe cá nhân hóa dựa trên dữ liệu thực tế mới nhất.
                </p>
                
                {!aiAdvice && !isLoading && (
                  <button 
                    onClick={handleAskAI}
                    className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-semibold rounded-lg transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-2"
                  >
                    <span>Phân tích dữ liệu & Lời khuyên</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7 7 7 7 7"/><path d="M12 19V5"/></svg>
                  </button>
                )}

                {isLoading && (
                  <div className="flex items-center gap-3 text-yellow-500 animate-pulse">
                    <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    Đang phân tích dữ liệu không khí...
                  </div>
                )}

                {aiAdvice && (
                  <div className="bg-zinc-800 rounded-xl p-4 border border-yellow-500/10 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="prose prose-invert prose-p:text-zinc-300 prose-headings:text-yellow-500 max-w-none">
                       <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{aiAdvice}</p>
                    </div>
                    <button 
                      onClick={() => handleAskAI()}
                      className="mt-4 text-xs text-yellow-600 hover:text-yellow-500 underline decoration-yellow-600/50"
                    >
                      Cập nhật phân tích
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-4">
            <AQIChart data={data} />
          </div>

          {/* Side List */}
          <div className="lg:col-span-1 h-[400px] flex flex-col">
             <h3 className="text-zinc-200 text-lg font-semibold mb-4">Chi tiết hàng ngày</h3>
             <DataTable data={[...data].reverse()} />
          </div>
        </div>

        <div className="text-center pt-8 border-t border-zinc-700">
          <p className="text-zinc-500 text-xs">
            Dữ liệu minh họa từ 4/11 - 9/12. Màu sắc trên giao diện là thiết kế, màu trong bảng tuân theo thang đo AQI.
          </p>
        </div>

      </main>
    </div>
  );
}

export default App;
