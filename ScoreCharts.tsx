
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { PlayerData } from '../types';

interface ScoreChartsProps {
  data: PlayerData[];
}

const ScoreCharts: React.FC<ScoreChartsProps> = ({ data }) => {
  const top10 = data.slice(0, 10).map(p => ({
    name: p.name,
    score: p.scoreFinal
  }));

  const topPlayer = data[0];
  const radarData = [
    { subject: 'Donations', value: topPlayer.noteDonations, fullMark: 400 },
    { subject: 'VS', value: topPlayer.noteVS, fullMark: 400 },
    { subject: 'Force', value: topPlayer.noteForce, fullMark: 400 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="glass-panel p-6 rounded-2xl h-[400px]">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Top 10 Player Scores
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={top10}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {top10.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel p-6 rounded-2xl h-[400px]">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Rank #1: {topPlayer.name} Attributes
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 400]} tick={false} axisLine={false} />
            <Radar
              name={topPlayer.name}
              dataKey="value"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreCharts;
