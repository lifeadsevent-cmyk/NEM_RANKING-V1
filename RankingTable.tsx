
import React from 'react';
import { PlayerData, SortKey, SortOrder } from '../types';

interface RankingTableProps {
  players: PlayerData[];
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
  searchTerm: string;
}

const RankingTable: React.FC<RankingTableProps> = ({ 
  players, sortKey, sortOrder, onSort, searchTerm 
}) => {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-500/20 text-amber-500 border border-amber-500/50';
    if (rank === 2) return 'bg-slate-300/20 text-slate-300 border border-slate-300/50';
    if (rank === 3) return 'bg-orange-500/20 text-orange-600 border border-orange-600/50';
    return 'text-slate-400';
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <span className="ml-1 text-slate-600">↕</span>;
    return sortOrder === 'asc' ? <span className="ml-1 text-indigo-400">↑</span> : <span className="ml-1 text-indigo-400">↓</span>;
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('rank')}>
                Rank {getSortIcon('rank')}
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors" onClick={() => onSort('name')}>
                Player {getSortIcon('name')}
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => onSort('donations')}>
                Donations {getSortIcon('donations')}
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => onSort('vs')}>
                VS {getSortIcon('vs')}
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => onSort('force')}>
                Force {getSortIcon('force')}
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-white transition-colors text-right" onClick={() => onSort('scoreFinal')}>
                Score Final {getSortIcon('scoreFinal')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {players.map((player) => (
              <tr key={player.rank} className="group hover:bg-indigo-500/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${getRankStyle(player.rank)}`}>
                    {player.rank}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {player.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 font-mono">
                  {player.donations.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 font-mono">
                  {(player.vs / 1000000).toFixed(1)}M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-slate-300 font-mono">
                  {(player.force / 1000000).toFixed(1)}M
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-sm font-bold border border-indigo-500/30">
                    {player.scoreFinal.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                  No players found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
