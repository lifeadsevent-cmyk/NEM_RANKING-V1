
import React, { useState, useMemo } from 'react';

// --- TYPES ---
export interface PlayerData {
  rank: number;
  name: string;
  donations: number;
  vs: number;
  force: number;
  noteDonations: number;
  noteVS: number;
  noteForce: number;
  scoreFinal: number;
}

export type SortKey = keyof PlayerData;
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'leaderboard' | 'teams';

// --- BASE DE DONNÉES ---
const PLAYER_DATABASE: Record<string, { force: number; vs: number; donations: number }> = {
  "Erekosee": { force: 71909193, vs: 99337884, donations: 38050 },
  "indiajam": { force: 65158143, vs: 74436415, donations: 41000 },
  "livioff": { force: 59021119, vs: 49419013, donations: 46700 },
  "sand69": { force: 56204529, vs: 67519556, donations: 56350 },
  "Alci Biade": { force: 55681501, vs: 49818587, donations: 50000 },
  "jmbar522": { force: 53698315, vs: 35696745, donations: 25850 },
  "NiarkNiark": { force: 52295353, vs: 52066355, donations: 39300 },
  "Defourailleuse": { force: 51852395, vs: 74816426, donations: 43300 },
  "Gaby sama": { force: 51050674, vs: 72671700, donations: 44250 },
  "NYMOUS": { force: 51032278, vs: 46636410, donations: 56700 },
  "Tortuga34": { force: 50652539, vs: 8783112, donations: 32250 },
  "Gawennn": { force: 49597576, vs: 64114098, donations: 42850 },
  "Henri33": { force: 49412731, vs: 47229557, donations: 40000 },
  "tassin62200": { force: 49145005, vs: 52024491, donations: 41800 },
  "la10las": { force: 47659947, vs: 42889668, donations: 44500 },
  "MiniLouvex": { force: 46956179, vs: 30072516, donations: 46900 },
  "SIMOwa": { force: 46157945, vs: 56294684, donations: 42850 },
  "Tobitus": { force: 45323426, vs: 13123365, donations: 44000 },
  "Haneluk": { force: 45108915, vs: 42496859, donations: 41950 },
  "AM075": { force: 44998970, vs: 32176844, donations: 52500 },
  "Layuna": { force: 44872582, vs: 40561700, donations: 50300 },
  "Zeubilamouchh": { force: 44612137, vs: 49240170, donations: 35950 },
  "RedDevil1971": { force: 44584472, vs: 18716927, donations: 45050 },
  "LiThys": { force: 43464759, vs: 32583746, donations: 45250 },
  "Jordidi": { force: 43429340, vs: 30445632, donations: 32100 },
  "Naana2B": { force: 43356605, vs: 35778511, donations: 39850 },
  "jokair73": { force: 43231281, vs: 27501818, donations: 31450 },
  "sparta60": { force: 42954021, vs: 32089213, donations: 39800 },
  "Barlitox": { force: 42888117, vs: 35324234, donations: 44600 },
  "Julyon29": { force: 42788772, vs: 42458433, donations: 37050 },
  "BaBaSsDaY": { force: 42594488, vs: 11241406, donations: 41900 },
  "Galmiore": { force: 42066326, vs: 35841164, donations: 42600 },
  "LouisAuguste Blanqui": { force: 40222258, vs: 41648887, donations: 45150 },
  "PredatorRage": { force: 39829715, vs: 35203275, donations: 34200 },
  "Eniloiv": { force: 39525177, vs: 30328686, donations: 31950 },
  "Varxvador": { force: 39298023, vs: 35396451, donations: 62450 },
  "K2 floyd": { force: 39293596, vs: 37040661, donations: 43700 },
  "MrNoop": { force: 39281926, vs: 39142849, donations: 37400 },
  "TPGOAT": { force: 38549450, vs: 20123358, donations: 39650 },
  "Laeti78140": { force: 38200971, vs: 27994575, donations: 48150 },
  "Sethy 1er": { force: 37554471, vs: 32431642, donations: 45950 },
  "Vladinski": { force: 37495830, vs: 25603044, donations: 27350 },
  "90piege": { force: 37045138, vs: 6701135, donations: 40000 },
  "Merlin tiktok": { force: 35320161, vs: 24004086, donations: 34100 },
  "hulking 33": { force: 34938627, vs: 11077815, donations: 44150 },
  "guivigz": { force: 34542426, vs: 24630713, donations: 36250 },
  "MANGEURDEMELON": { force: 34182320, vs: 24455536, donations: 38100 },
  "La ficelle": { force: 34035965, vs: 15450389, donations: 18150 },
  "PiotrekBr": { force: 33909124, vs: 37777057, donations: 43100 },
  "Bladasse Poutrasse": { force: 33257850, vs: 29228777, donations: 44500 },
  "Will HG 31": { force: 32574448, vs: 8287191, donations: 43950 },
  "fifou313": { force: 31533197, vs: 27358905, donations: 35600 },
  "NEM3ZiiSs": { force: 31096280, vs: 0, donations: 0 },
  "Gaetan 60": { force: 30716284, vs: 13885093, donations: 37650 },
  "Tchiki7": { force: 30300044, vs: 8099601, donations: 32100 },
  "Stéphane81": { force: 30228097, vs: 20968240, donations: 42400 },
  "ARASH 89": { force: 29655091, vs: 5980071, donations: 27250 },
  "2chevaux": { force: 29429784, vs: 25746386, donations: 42900 },
  "GamerBomb": { force: 29357088, vs: 19952679, donations: 25800 },
  "Dy17": { force: 29012935, vs: 13020529, donations: 41150 },
  "lupapa44": { force: 28957072, vs: 31932386, donations: 45750 },
  "Telmaa": { force: 28933996, vs: 29119436, donations: 40500 },
  "DonCorleon06": { force: 28891634, vs: 17538251, donations: 45350 },
  "Vinskiller": { force: 28783840, vs: 11759155, donations: 35150 },
  "apostol17": { force: 28463810, vs: 3593475, donations: 27750 },
  "Teemoana": { force: 28321408, vs: 9763798, donations: 30550 },
  "Daniyak": { force: 28239699, vs: 6993554, donations: 27500 },
  "Diabologum": { force: 27809783, vs: 21471711, donations: 74400 },
  "MrBBo": { force: 26818450, vs: 21166249, donations: 39300 },
  "m0200": { force: 25708106, vs: 7289826, donations: 25850 },
  "JackPalme9": { force: 25594423, vs: 20561674, donations: 45900 },
  "Beezh": { force: 25543131, vs: 8118550, donations: 37500 },
  "SamJod": { force: 25541250, vs: 7582419, donations: 52250 },
  "Flashbakk": { force: 25462065, vs: 14142575, donations: 38550 },
  "bobdu30": { force: 25050813, vs: 5489533, donations: 13200 },
  "Mato13": { force: 24959399, vs: 9911210, donations: 37100 },
  "KachS": { force: 24495632, vs: 12568727, donations: 40550 },
  "Moussica": { force: 24229930, vs: 2787838, donations: 30250 },
  "Celylam23": { force: 23795000, vs: 30199768, donations: 44350 },
  "Jongap": { force: 23635724, vs: 3961533, donations: 15950 },
  "MinouVille": { force: 22240335, vs: 9346781, donations: 25450 },
  "freyoux": { force: 21628275, vs: 2458733, donations: 28050 },
  "Camm329": { force: 21157758, vs: 7262083, donations: 34800 },
  "binesa78": { force: 20931053, vs: 10429165, donations: 14800 },
  "Phoeniix76": { force: 19631061, vs: 9036876, donations: 42450 },
  "Merguezfrites": { force: 19595664, vs: 10929384, donations: 26500 },
  "Rudyq": { force: 19454316, vs: 4565491, donations: 41350 },
  "jacks90": { force: 19125797, vs: 6801606, donations: 23450 },
  "balou0516": { force: 18527806, vs: 6379273, donations: 36700 },
  "Toto97444": { force: 18525598, vs: 9806468, donations: 29400 },
  "Fifoudrong": { force: 17520608, vs: 5281135, donations: 36350 },
  "DirkNight": { force: 17218843, vs: 15159976, donations: 28800 },
  "Ixilor": { force: 17089562, vs: 0, donations: 0 },
  "commandantgrosbidou": { force: 13930280, vs: 5589964, donations: 12750 },
  "Atomaelsass": { force: 13157883, vs: 1052624, donations: 5950 },
  "ManonSMK276": { force: 12862656, vs: 13866, donations: 0 },
  "Nixouille": { force: 12693797, vs: 5346420, donations: 37000 },
  "fabio1996": { force: 12632414, vs: 6118053, donations: 23400 }
};

// --- CALCULS DES MOYENNES ---
const DB_VALUES = Object.values(PLAYER_DATABASE);
const AVG_FORCE = DB_VALUES.reduce((a, b) => a + b.force, 0) / DB_VALUES.length;
const AVG_VS = DB_VALUES.reduce((a, b) => a + b.vs, 0) / DB_VALUES.length;
const AVG_DONATIONS = DB_VALUES.reduce((a, b) => a + b.donations, 0) / DB_VALUES.length;

const RAW_DATA: PlayerData[] = Object.entries(PLAYER_DATABASE)
  .map(([name, stats]) => {
    const noteForce = (stats.force / AVG_FORCE) * 100;
    const noteVS = (stats.vs / AVG_VS) * 100;
    const noteDonations = (stats.donations / AVG_DONATIONS) * 100;
    const scoreFinal = (noteDonations * 0.35 + noteVS * 0.35 + noteForce * 0.3);

    return {
      name,
      force: stats.force,
      vs: stats.vs,
      donations: stats.donations,
      noteForce: parseFloat(noteForce.toFixed(2)),
      noteVS: parseFloat(noteVS.toFixed(2)),
      noteDonations: parseFloat(noteDonations.toFixed(2)),
      scoreFinal: parseFloat(scoreFinal.toFixed(2))
    };
  })
  .sort((a, b) => b.scoreFinal - a.scoreFinal)
  .map((p, index) => ({ ...p, rank: index + 1 }));

// --- LOGIQUE TEAM BUILDER 60/40 ---
const buildTeams = (players: PlayerData[]) => {
  const excluded = ["PredatorRage", "livioff"];
  const filtered = players.filter(p => !excluded.includes(p.name));
  const pool = [...filtered].sort((a, b) => b.scoreFinal - a.scoreFinal).slice(0, 60);
  
  const startersPool = pool.slice(0, 40);
  const subsPool = pool.slice(40, 60);

  let startersA: PlayerData[] = [];
  let startersB: PlayerData[] = [];
  let subsA: PlayerData[] = [];
  let subsB: PlayerData[] = [];

  const forcedA = ["Naana2B", "LiThys", "NYMOUS"];
  const forcedB = ["LouisAuguste Blanqui"];

  forcedA.forEach(name => {
    const p = pool.find(player => player.name === name);
    if (p) {
      if (startersPool.some(s => s.name === name)) startersA.push(p);
      else subsA.push(p);
    }
  });

  forcedB.forEach(name => {
    const p = pool.find(player => player.name === name);
    if (p) {
      if (startersPool.some(s => s.name === name)) startersB.push(p);
      else subsB.push(p);
    }
  });

  const allForced = [...forcedA, ...forcedB];
  const remainingStarters = startersPool.filter(p => !allForced.includes(p.name)).sort((a, b) => b.force - a.force);

  let currentForceA = startersA.reduce((acc, p) => acc + p.force, 0);
  let currentForceB = startersB.reduce((acc, p) => acc + p.force, 0);
  
  remainingStarters.forEach(p => {
    const totalCurrentForce = currentForceA + currentForceB + p.force;
    const targetRatioA = 0.6;
    if ((currentForceA < totalCurrentForce * targetRatioA && startersA.length < 20) || startersB.length >= 20) {
      startersA.push(p);
      currentForceA += p.force;
    } else {
      startersB.push(p);
      currentForceB += p.force;
    }
  });

  const remainingSubs = subsPool.filter(p => !allForced.includes(p.name)).sort((a, b) => b.force - a.force);
  remainingSubs.forEach(p => {
    const totalCurrentForce = currentForceA + currentForceB + p.force;
    const targetRatioA = 0.6;
    if ((currentForceA < totalCurrentForce * targetRatioA && subsA.length < 10) || subsB.length >= 10) {
      subsA.push(p);
      currentForceA += p.force;
    } else {
      subsB.push(p);
      currentForceB += p.force;
    }
  });

  const nameToTeam: Record<string, string> = {};
  startersA.forEach(p => nameToTeam[p.name] = 'ALPHA');
  subsA.forEach(p => nameToTeam[p.name] = 'ALPHA');
  startersB.forEach(p => nameToTeam[p.name] = 'BRAVO');
  subsB.forEach(p => nameToTeam[p.name] = 'BRAVO');

  return {
    teamA: { starters: startersA.sort((a, b) => b.scoreFinal - a.scoreFinal), subs: subsA.sort((a, b) => b.scoreFinal - a.scoreFinal), totalForce: currentForceA },
    teamB: { starters: startersB.sort((a, b) => b.scoreFinal - a.scoreFinal), subs: subsB.sort((a, b) => b.scoreFinal - a.scoreFinal), totalForce: currentForceB },
    nameToTeam
  };
};

const TeamCard = ({ title, players, force, color, totalForceGlobal }: any) => {
  const percentage = totalForceGlobal > 0 ? ((force / totalForceGlobal) * 100).toFixed(1) : "0";
  return (
    <div className={`glass-panel rounded-[2.5rem] overflow-hidden border-t-4 transition-all duration-500 hover:shadow-2xl ${color === 'indigo' ? 'border-indigo-500 shadow-indigo-500/10' : 'border-emerald-500 shadow-emerald-500/10'}`}>
      <div className="p-8 bg-slate-800/20 backdrop-blur-md">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">{title}</h3>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">FORCE DE FRAPPE: {(force / 1000000).toFixed(1)}M</p>
          </div>
          <div className="text-right">
            <span className={`text-4xl font-black ${color === 'indigo' ? 'text-indigo-400' : 'text-emerald-400'}`}>{percentage}%</span>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">IMPACT RATIO</p>
          </div>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden shadow-inner">
          <div className={`h-full transition-all duration-1000 ease-out rounded-full ${color === 'indigo' ? 'bg-gradient-to-r from-indigo-600 to-indigo-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <div className="p-6 space-y-8">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-5 flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${color === 'indigo' ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`}></span>
            TITULAIRES (20)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.starters.map((p: PlayerData) => (
              <div key={p.name} className="bg-slate-900/40 p-3.5 rounded-2xl border border-slate-800/50 flex items-center gap-3 hover:border-slate-700 transition-colors group">
                <span className="text-[10px] font-black text-slate-600 w-5">#{p.rank}</span>
                <span className="text-xs font-bold truncate flex-1 text-slate-200 group-hover:text-white">{p.name}</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">{(p.force / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600 mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
            REMPLAÇANTS (10)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {players.subs.map((p: PlayerData) => (
              <div key={p.name} className="bg-slate-900/20 p-2.5 rounded-xl border border-dashed border-slate-800 flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-700 w-5">#{p.rank}</span>
                <span className="text-xs font-medium truncate flex-1 text-slate-500">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewMode>('leaderboard');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ key: SortKey, order: SortOrder }>({ key: 'rank', order: 'asc' });
  const [page, setPage] = useState(1);
  const itemsPerPage = 30;

  const teams = useMemo(() => buildTeams(RAW_DATA), []);

  const processed = useMemo(() => {
    let list = RAW_DATA.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    list.sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      const res = typeof av === 'string' ? (av as string).localeCompare(bv as string) : (av as number) - (bv as number);
      return sort.order === 'asc' ? res : -res;
    });
    return list;
  }, [search, sort]);

  const totalForceGlobalTeams = teams.teamA.totalForce + teams.teamB.totalForce;
  const totalPages = Math.ceil(processed.length / itemsPerPage);
  const currentItems = processed.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSort = (key: SortKey) => {
    setSort(prev => ({ key, order: prev.key === key && prev.order === 'desc' ? 'asc' : 'desc' }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-10 font-['Inter'] selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16 relative">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-300 to-emerald-400 drop-shadow-2xl uppercase">
              NEM RANKING
            </h1>
            <h2 className="text-7xl font-black tracking-tighter text-amber-500 drop-shadow-2xl uppercase italic">
              Tempête du désert
            </h2>
            <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] opacity-40 mt-4">
              High-Fidelity Guild Intelligence Hub
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <nav className="flex bg-slate-900/60 p-1.5 rounded-3xl border border-white/5 backdrop-blur-2xl shadow-3xl">
              <button 
                onClick={() => setView('leaderboard')}
                className={`px-8 py-4 rounded-2xl text-[11px] font-black tracking-widest transition-all duration-300 ${view === 'leaderboard' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : 'text-slate-500 hover:text-white'}`}
              >
                CLASSEMENT
              </button>
              <button 
                onClick={() => setView('teams')}
                className={`px-8 py-4 rounded-2xl text-[11px] font-black tracking-widest transition-all duration-300 ${view === 'teams' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' : 'text-slate-500 hover:text-white'}`}
              >
                SQUAD DISPATCH
              </button>
            </nav>
            {view === 'leaderboard' && (
              <div className="relative w-full sm:w-80 group">
                <input 
                  type="text" placeholder="LOCATE AGENT..." 
                  className="bg-slate-900/80 border border-slate-800/50 rounded-2xl px-6 py-4 w-full focus:ring-2 ring-indigo-500/50 outline-none transition-all text-xs font-black tracking-widest placeholder:text-slate-700"
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            )}
          </div>
        </header>

        {view === 'leaderboard' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Force Cumulative', val: (processed.reduce((a,b)=>a+b.force,0)/1000000).toFixed(1) + 'M', color: 'border-indigo-500' },
                { label: 'Donations Hebdo', val: (processed.reduce((a,b)=>a+b.donations,0)/1000).toFixed(1) + 'K', color: 'border-emerald-500' },
                { label: 'Moyenne Force', val: (AVG_FORCE/1000000).toFixed(1) + 'M', color: 'border-slate-800' },
                { label: 'Moyenne VS', val: (AVG_VS/1000000).toFixed(1) + 'M', color: 'border-amber-500' }
              ].map((s, i) => (
                <div key={i} className={`glass-panel p-8 rounded-[2.5rem] border-t-2 ${s.color} hover:bg-slate-800/40 transition-all duration-300 group shadow-lg`}>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-3 group-hover:text-slate-300 transition-colors">{s.label}</p>
                  <p className="text-4xl font-black text-white tracking-tighter">{s.val}</p>
                </div>
              ))}
            </div>

            <div className="glass-panel rounded-[3rem] overflow-hidden border-slate-800/50 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800/30 text-[11px] uppercase tracking-[0.4em] font-black text-slate-500 border-b border-white/5">
                      <th className="px-6 py-8 cursor-pointer" onClick={() => handleSort('rank')}>RANG</th>
                      <th className="px-6 py-8 cursor-pointer" onClick={() => handleSort('name')}>AGENT</th>
                      <th className="px-6 py-8 text-center">UNITÉ</th>
                      <th className="px-6 py-8 cursor-pointer text-center" onClick={() => handleSort('donations')}>DONATIONS</th>
                      <th className="px-6 py-8 cursor-pointer text-center" onClick={() => handleSort('vs')}>VS</th>
                      <th className="px-6 py-8 cursor-pointer text-center" onClick={() => handleSort('force')}>FORCE</th>
                      <th className="px-6 py-8 cursor-pointer text-center" onClick={() => handleSort('scoreFinal')}>POWER SCORE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentItems.map(p => {
                      const unit = teams.nameToTeam[p.name] || 'N/A';
                      return (
                        <tr key={p.name} className="hover:bg-indigo-500/5 transition-all duration-200 group">
                          <td className="px-6 py-7">
                            <span className={`inline-block w-10 h-10 text-center leading-10 rounded-2xl font-black text-xs ${
                              p.rank === 1 ? 'bg-amber-500 text-black shadow-xl' : 
                              p.rank === 2 ? 'bg-slate-400 text-black' : 
                              p.rank === 3 ? 'bg-orange-600 text-white' : 'text-slate-500 bg-slate-900/50'
                            }`}>{p.rank}</span>
                          </td>
                          <td className="px-6 py-7 font-black text-base text-white group-hover:text-indigo-400 transition-colors">
                            {p.name}
                          </td>
                          <td className="px-6 py-7 text-center">
                            <span className={`text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg border flex items-center justify-center gap-2 mx-auto max-w-[100px] ${
                              unit === 'ALPHA' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' : 
                              unit === 'BRAVO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 
                              'bg-slate-800/50 text-slate-500 border-slate-700/30'
                            }`}>
                              <span className={`w-1 h-1 rounded-full ${unit === 'ALPHA' ? 'bg-indigo-400' : 'bg-emerald-400'}`}></span>
                              {unit}
                            </span>
                          </td>
                          <td className="px-6 py-7 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-mono text-xs text-slate-300">{p.donations.toLocaleString()}</span>
                              <span className="mt-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-black border border-emerald-500/20">
                                {p.noteDonations}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-7 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-mono text-xs text-slate-300">{(p.vs/1000000).toFixed(2)}M</span>
                              <span className="mt-1 bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full text-[9px] font-black border border-indigo-500/20">
                                {p.noteVS}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-7 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-mono text-xs text-slate-100 font-bold">{(p.force/1000000).toFixed(3)}M</span>
                              <span className="mt-1 bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-[9px] font-black border border-blue-500/20">
                                {p.noteForce}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-7 text-center">
                            <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-5 py-2.5 rounded-xl text-[12px] font-black shadow-inner">
                              {p.scoreFinal.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 pb-24">
                <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-10 py-5 bg-slate-900 border border-white/5 rounded-2xl text-[11px] font-black tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-20" disabled={page === 1}>PREV SECTOR</button>
                <div className="flex items-center gap-4 bg-slate-900/40 px-6 py-4 rounded-3xl border border-white/5">
                    <span className="text-white font-black text-xl">{page}</span>
                    <span className="text-slate-500 font-bold">/ {totalPages}</span>
                </div>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-10 py-5 bg-slate-900 border border-white/5 rounded-2xl text-[11px] font-black tracking-[0.2em] hover:bg-slate-800 transition-all disabled:opacity-20" disabled={page === totalPages}>NEXT SECTOR</button>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
            <div className="glass-panel p-12 rounded-[4rem] mb-12 border-l-[15px] border-indigo-600 shadow-2xl overflow-hidden relative">
              <h2 className="text-6xl font-black tracking-tighter text-white italic mb-2 uppercase relative z-10">Squad Dispatch Protocol</h2>
              <div className="absolute right-0 top-0 text-[180px] font-black text-white/5 select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4 italic">60/40</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
              <TeamCard 
                title="UNITE ALPHA" 
                players={teams.teamA} 
                force={teams.teamA.totalForce} 
                color="indigo"
                totalForceGlobal={totalForceGlobalTeams}
              />
              <TeamCard 
                title="UNITE BRAVO" 
                players={teams.teamB} 
                force={teams.teamB.totalForce} 
                color="emerald"
                totalForceGlobal={totalForceGlobalTeams}
              />
            </div>
          </div>
        )}
      </div>

      <footer className="max-w-7xl mx-auto border-t border-white/5 pt-16 pb-24 flex flex-col md:flex-row justify-between items-center opacity-40">
        <div className="flex items-center gap-8">
            <div className="w-14 h-14 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center font-black text-2xl text-slate-400">N</div>
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.7em] text-slate-500">NEM RANKING • DESERT STORM</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-700 mt-1">Relative Average Scoring Matrix Active • 60/40 Optimized Split</p>
            </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black text-slate-500 tracking-[0.4em] uppercase">SYSTEM OPTIMIZED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
