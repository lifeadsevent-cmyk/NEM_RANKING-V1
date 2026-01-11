
import React from 'react';
import { PlayerData } from '../types';

interface StatsCardsProps {
  data: PlayerData[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const totalPlayers = data.length;
  const avgScore = data.reduce((acc, p) => acc + p.scoreFinal, 0) / totalPlayers;
  const topPlayer = data[0];
  const maxDonation = Math.max(...data.map(p => p.donations));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-panel p-6 rounded-2xl">
        <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Players</p>
        <p className="text-3xl font-extrabold text-white">{totalPlayers}</p>
      </div>
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-indigo-500">
        <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Average Score</p>
        <p className="text-3xl font-extrabold text-indigo-400">{avgScore.toFixed(2)}</p>
      </div>
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500">
        <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Top Player</p>
        <p className="text-2xl font-extrabold text-white truncate">{topPlayer?.name || 'N/A'}</p>
      </div>
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
        <p className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Highest Donation</p>
        <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-emerald-400">{maxDonation.toLocaleString()}</p>
            <span className="text-xs text-slate-500 font-semibold uppercase">NEM</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
