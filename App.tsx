
import React, { useState, useMemo, useEffect } from 'react';

// ========================================================
// 🛡️ CLOUD DATABASE (PERSISTANCE GITHUB / VERCEL)
// ========================================================
// NOTE POUR LE LEAD : Remplacez ce bloc par le code généré dans l'onglet "EFFECTIF".
const INITIAL_DATABASE: Record<string, { force: number; vs: number; donations: number }> = {
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

const INITIAL_TRAIN: Record<string, string> = {};
const INITIAL_WEEK = { start: '05/01/26', end: '10/01/26' };

// ========================================================

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
  squad?: string;
}

export type ViewMode = 'leaderboard' | 'teams' | 'train' | 'add-player';

// --- LOGIQUE TEAM BUILDER 60/40 ---
const buildTeams = (players: PlayerData[]) => {
  const pool = [...players].sort((a, b) => b.scoreFinal - a.scoreFinal).slice(0, 60);
  const startersPool = pool.slice(0, 40);
  const subsPool = pool.slice(40, 60);
  
  let startersA: PlayerData[] = [], startersB: PlayerData[] = [], subsA: PlayerData[] = [], subsB: PlayerData[] = [];
  const forcedA = ["Naana2B", "LiThys", "NYMOUS"], forcedB = ["LouisAuguste Blanqui"];
  
  forcedA.forEach(name => {
    const p = pool.find(player => player.name === name);
    if (p) { if (startersPool.some(s => s.name === name)) startersA.push(p); else subsA.push(p); }
  });
  forcedB.forEach(name => {
    const p = pool.find(player => player.name === name);
    if (p) { if (startersPool.some(s => s.name === name)) startersB.push(p); else subsB.push(p); }
  });

  const allForced = [...forcedA, ...forcedB];
  const remainingStarters = startersPool.filter(p => !allForced.includes(p.name)).sort((a, b) => b.force - a.force);
  let currentForceA = startersA.reduce((acc, p) => acc + p.force, 0), currentForceB = startersB.reduce((acc, p) => acc + p.force, 0);

  remainingStarters.forEach(p => {
    const totalForce = currentForceA + currentForceB + p.force;
    if ((currentForceA < totalForce * 0.6 && startersA.length < 20) || startersB.length >= 20) { startersA.push(p); currentForceA += p.force; }
    else { startersB.push(p); currentForceB += p.force; }
  });

  const remainingSubs = subsPool.filter(p => !allForced.includes(p.name)).sort((a, b) => b.force - a.force);
  remainingSubs.forEach(p => {
    const totalForce = currentForceA + currentForceB + p.force;
    if ((currentForceA < totalForce * 0.6 && subsA.length < 10) || subsB.length >= 10) { subsA.push(p); currentForceA += p.force; }
    else { subsB.push(p); currentForceB += p.force; }
  });

  const nameToSquad: Record<string, string> = {};
  startersA.forEach(p => nameToSquad[p.name] = 'ALPHA'); subsA.forEach(p => nameToSquad[p.name] = 'ALPHA');
  startersB.forEach(p => nameToSquad[p.name] = 'BRAVO'); subsB.forEach(p => nameToSquad[p.name] = 'BRAVO');
  
  return { startersA, startersB, subsA, subsB, currentForceA, currentForceB, nameToSquad };
};

export default function App() {
  const [view, setView] = useState<ViewMode>('leaderboard');
  const [search, setSearch] = useState('');
  const [isLead, setIsLead] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passInput, setPassInput] = useState('');
  
  const [customPlayers, setCustomPlayers] = useState<Record<string, { force: number; vs: number; donations: number }>>({});
  const [train, setTrain] = useState<Record<string, string>>(INITIAL_TRAIN);
  const [weekRange, setWeekRange] = useState(INITIAL_WEEK);
  const [exportSource, setExportSource] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nem_custom_v4');
    if (saved) setCustomPlayers(JSON.parse(saved));
    const savedTrain = localStorage.getItem('nem_train_v4');
    if (savedTrain) setTrain(JSON.parse(savedTrain));
    const savedWeek = localStorage.getItem('nem_week_v4');
    if (savedWeek) setWeekRange(JSON.parse(savedWeek));
  }, []);

  const fullDataset = useMemo(() => {
    const all = { ...INITIAL_DATABASE, ...customPlayers };
    const values = Object.values(all);
    const avgF = values.reduce((acc, b) => acc + b.force, 0) / (values.length || 1);
    const avgV = values.reduce((acc, b) => acc + b.vs, 0) / (values.length || 1);
    const avgD = values.reduce((acc, b) => acc + b.donations, 0) / (values.length || 1);

    const players = Object.entries(all)
      .map(([name, stats]) => {
        const nf = (stats.force / avgF) * 100, nv = (stats.vs / avgV) * 100, nd = (stats.donations / avgD) * 100;
        return {
          name, force: stats.force, vs: stats.vs, donations: stats.donations,
          noteForce: parseFloat(nf.toFixed(1)), noteVS: parseFloat(nv.toFixed(1)), noteDonations: parseFloat(nd.toFixed(1)),
          scoreFinal: parseFloat((nd * 0.35 + nv * 0.35 + nf * 0.3).toFixed(2))
        };
      })
      .sort((a, b) => b.scoreFinal - a.scoreFinal)
      .map((p, i) => ({ ...p, rank: i + 1 }));

    const { nameToSquad } = buildTeams(players);
    return players.map(p => ({ ...p, squad: nameToSquad[p.name] || 'RESERVE' }));
  }, [customPlayers]);

  const teams = useMemo(() => buildTeams(fullDataset), [fullDataset]);
  const filteredData = useMemo(() => fullDataset.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [fullDataset, search]);

  const checkLead = () => {
    if (passInput === 'NEMLEAD') { setIsLead(true); setShowLogin(false); setPassInput(''); }
    else alert("ACCÈS REFUSÉ");
  };

  const handleAssign = (playerName: string) => {
    if (!isLead || !selectedDate) return;
    const next = { ...train, [selectedDate]: playerName };
    setTrain(next);
    localStorage.setItem('nem_train_v4', JSON.stringify(next));
    setSelectedDate(null);
  };

  const handleClearTrain = (date: string) => {
    if (!isLead) return;
    const next = { ...train };
    delete next[date];
    setTrain(next);
    localStorage.setItem('nem_train_v4', JSON.stringify(next));
  };

  const handleGenerateSource = () => {
    const mergedDB = { ...INITIAL_DATABASE, ...customPlayers };
    const dbCode = `const INITIAL_DATABASE: Record<string, { force: number; vs: number; donations: number }> = ${JSON.stringify(mergedDB, null, 2)};`;
    const trainCode = `const INITIAL_TRAIN: Record<string, string> = ${JSON.stringify(train, null, 2)};`;
    const weekCode = `const INITIAL_WEEK = ${JSON.stringify(weekRange, null, 2)};`;
    setExportSource(`${dbCode}\n\n${trainCode}\n\n${weekCode}`);
  };

  const calendarDays = useMemo(() => {
    const now = new Date(), year = now.getFullYear(), month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1, days = [];
    for (let i = 0; i < offset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
    return days;
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-['Inter'] selection:bg-indigo-500/30 p-4 md:p-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-300 to-emerald-400 uppercase drop-shadow-2xl">
              NEM RANKING
            </h1>
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
               <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">OP : TEMPETE DU DESERT</span>
               <span className="border border-white/10 px-4 py-1 rounded-full text-[10px] font-black uppercase text-slate-500 tracking-widest">
                 DATES : {weekRange.start} → {weekRange.end}
               </span>
               <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-4 py-1 rounded-full text-[9px] font-black uppercase">FULL CLOUD SYNC ACTIVE</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <nav className="flex bg-slate-900/60 p-1.5 rounded-3xl border border-white/5 backdrop-blur-xl">
               {['leaderboard', 'teams', 'train', 'add-player'].map(m => (
                 <button key={m} onClick={() => setView(m as ViewMode)} className={`px-6 py-4 rounded-2xl text-[9px] font-black tracking-widest transition-all ${view === m ? 'bg-indigo-600 shadow-xl' : 'text-slate-500 hover:text-white uppercase'}`}>
                   {m === 'leaderboard' ? 'CLASSEMENT' : m === 'teams' ? 'SQUAD' : m === 'train' ? 'TRAIN' : 'EFFECTIF'}
                 </button>
               ))}
            </nav>
            <button onClick={() => isLead ? setIsLead(false) : setShowLogin(true)} className={`px-6 py-4 rounded-2xl border text-[9px] font-black tracking-widest uppercase transition-all ${isLead ? 'bg-amber-500 text-black border-amber-400' : 'bg-slate-950 text-slate-500 border-white/10'}`}>
              {isLead ? 'MODE LEAD' : 'LOGIN'}
            </button>
          </div>
        </header>

        {/* MAIN VIEW */}
        {view === 'leaderboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="glass-panel rounded-[2.5rem] overflow-hidden border-slate-800/50 shadow-2xl">
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
                 <input type="text" placeholder="RECHERCHER UN AGENT..." value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-950 border border-white/5 rounded-2xl px-8 py-5 w-full md:w-96 text-xs font-bold uppercase focus:border-indigo-500 outline-none transition-all shadow-inner" />
                 <div className="flex items-center gap-6">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FORCE ALLIANCE</p>
                       <p className="text-2xl font-black text-white italic">{(fullDataset.reduce((a,b)=>a+b.force,0)/1000000).toFixed(1)}M</p>
                    </div>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/30 text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 border-b border-white/5">
                    <tr>
                      <th className="px-8 py-8">RANG</th>
                      <th className="px-8 py-8">AGENT</th>
                      <th className="px-8 py-8 text-center">SQUAD</th>
                      <th className="px-8 py-8 text-center">FORCE</th>
                      <th className="px-8 py-8 text-center">VS</th>
                      <th className="px-8 py-8 text-center">DONATIONS</th>
                      <th className="px-8 py-8 text-right">SCORE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredData.map(p => (
                      <tr key={p.name} className="hover:bg-indigo-500/5 group transition-all duration-300">
                        <td className="px-8 py-7">
                          <span className={`inline-block w-10 h-10 text-center leading-10 rounded-xl font-black text-[11px] ${p.rank <= 3 ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'bg-slate-900 text-slate-500'}`}>{p.rank}</span>
                        </td>
                        <td className="px-8 py-7">
                          <p className="font-black text-base uppercase group-hover:text-indigo-400 transition-colors">{p.name}</p>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest border ${p.squad === 'ALPHA' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : p.squad === 'BRAVO' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                            {p.squad}
                          </span>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-mono text-slate-300">{(p.force/1000000).toFixed(2)}M</span>
                            <span className="mt-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[9px] font-black tracking-widest">{p.noteForce}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-mono text-slate-300">{(p.vs/1000000).toFixed(2)}M</span>
                            <span className="mt-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[9px] font-black tracking-widest">{p.noteVS}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-7 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-mono text-slate-300">{p.donations.toLocaleString()}</span>
                            <span className="mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] font-black tracking-widest">{p.noteDonations}%</span>
                          </div>
                        </td>
                        <td className="px-8 py-7 text-right">
                          <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-5 py-2.5 rounded-xl font-black text-xs shadow-lg">{p.scoreFinal.toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SQUAD VIEW */}
        {view === 'teams' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in slide-in-from-bottom-8 duration-700">
             {[
               { name: 'UNIT ALPHA (A)', data: teams.startersA, subs: teams.subsA, force: teams.currentForceA, color: 'indigo' },
               { name: 'UNIT BRAVO (B)', data: teams.startersB, subs: teams.subsB, force: teams.currentForceB, color: 'emerald' }
             ].map(t => (
               <div key={t.name} className={`glass-panel p-10 rounded-[3rem] border-t-8 ${t.color === 'indigo' ? 'border-indigo-600' : 'border-emerald-600'}`}>
                  <div className="flex justify-between items-end mb-8">
                     <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">{t.name}</h3>
                     <p className="text-xl font-black text-slate-400 italic">{(t.force/1000000).toFixed(1)}M PWR</p>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">TITULAIRES (TOP 20)</p>
                     <div className="grid grid-cols-2 gap-3">
                        {t.data.map(p => (
                          <div key={p.name} className="bg-slate-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                             <span className="text-[10px] font-bold truncate text-slate-300">{p.name}</span>
                             <span className="text-[9px] font-mono text-slate-500">{(p.force/1000000).toFixed(1)}M</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* TRAIN VIEW */}
        {view === 'train' && (
          <div className="animate-in slide-in-from-right-4 duration-700">
             <div className="glass-panel p-10 rounded-[4rem] border-white/5 shadow-2xl">
                <h3 className="text-5xl font-black italic uppercase text-white mb-10 tracking-tighter">Logistique du Train</h3>
                <div className="grid grid-cols-7 gap-4">
                   {['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'].map(d => <div key={d} className="text-center text-[11px] font-black text-slate-600 tracking-widest py-4">{d}</div>)}
                   {calendarDays.map((date, idx) => {
                     if (!date) return <div key={`empty-${idx}`} className="aspect-square bg-slate-900/10 rounded-3xl border border-dashed border-slate-800 opacity-20"></div>;
                     const driver = train[date];
                     return (
                       <div key={date} onClick={() => isLead && setSelectedDate(date)} className={`aspect-square relative rounded-[2.5rem] border flex flex-col items-center justify-center p-6 cursor-pointer transition-all ${driver ? 'bg-amber-500/10 border-amber-500/50 shadow-lg' : 'bg-slate-950 border-white/5 hover:border-slate-500'}`}>
                          <span className="absolute top-4 left-6 text-[10px] font-black text-slate-700">{date.split('-')[2]}</span>
                          <span className="text-xs font-black text-white uppercase text-center">{driver || (isLead ? 'CHOISIR' : 'LIBRE')}</span>
                          {driver && isLead && <button onClick={e => { e.stopPropagation(); handleClearTrain(date); }} className="absolute top-2 right-2 text-red-500 font-bold p-1">×</button>}
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>
        )}

        {/* EFFECTIF / ADMIN VIEW */}
        {view === 'add-player' && (
          <div className="animate-in slide-in-from-right-12 duration-700 space-y-12">
            <div className="glass-panel p-16 rounded-[5rem] border-l-[25px] border-emerald-600 shadow-2xl relative overflow-hidden">
               <h3 className="text-7xl font-black italic uppercase leading-none text-white">Archives & Sync</h3>
               <div className="absolute right-0 top-0 text-[180px] font-black text-white/5 select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4 italic">DATA</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="glass-panel p-10 rounded-[3rem] border-white/5 space-y-10">
                   <h4 className="text-3xl font-black uppercase italic text-white">Persistance Cloud</h4>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                     Ce bouton génère le code incluant **toutes** les données actuelles (nouveaux joueurs, calendrier du train, semaine).
                     Remplacez le bloc INITIAL_DATABASE et INITIAL_TRAIN au début de App.tsx sur GitHub pour sauvegarder en ligne.
                   </p>
                   <button onClick={handleGenerateSource} className="w-full py-8 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-indigo-500 transition-all">GÉNÉRER CODE SOURCE GLOBAL</button>
                   {exportSource && (
                     <div className="space-y-4 animate-in fade-in">
                        <textarea readOnly value={exportSource} className="w-full bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 font-mono text-[9px] text-indigo-400 h-48 no-scrollbar shadow-inner" />
                        <button onClick={() => { navigator.clipboard.writeText(exportSource); alert("CODE COPIÉ !"); }} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest">COPIER DANS LE PRESSE-PAPIER</button>
                     </div>
                   )}
                </div>

                <div className="glass-panel p-10 rounded-[3rem] border-white/5 space-y-10">
                   <h4 className="text-3xl font-black uppercase italic text-white">Ajouter Agent</h4>
                   <form onSubmit={e => {
                     e.preventDefault();
                     if (!isLead) return;
                     const fd = new FormData(e.currentTarget);
                     const next = { ...customPlayers, [fd.get('name') as string]: { force: parseInt(fd.get('force') as string), vs: parseInt(fd.get('vs') as string), donations: parseInt(fd.get('donations') as string) } };
                     setCustomPlayers(next);
                     localStorage.setItem('nem_custom_v4', JSON.stringify(next));
                     (e.currentTarget as HTMLFormElement).reset();
                     alert("AGENT AJOUTÉ LOCALEMENT.");
                   }} className="grid grid-cols-1 gap-6">
                      <input name="name" placeholder="NOM AGENT" required className="bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold uppercase focus:border-emerald-500 outline-none" />
                      <div className="grid grid-cols-3 gap-4">
                        <input name="force" type="number" placeholder="FORCE" required className="bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold outline-none" />
                        <input name="vs" type="number" placeholder="VS" required className="bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold outline-none" />
                        <input name="donations" type="number" placeholder="DON" required className="bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold outline-none" />
                      </div>
                      <button type="submit" className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest ${isLead ? 'bg-emerald-600 text-black shadow-2xl' : 'bg-slate-900 text-slate-600 cursor-not-allowed'}`}>
                        {isLead ? 'ENRÔLER MAINTENANT' : 'MODE LEAD REQUIS'}
                      </button>
                   </form>
                </div>
            </div>
          </div>
        )}

        {/* LOGIN MODAL */}
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="glass-panel p-12 rounded-[3rem] border-amber-500/50 max-w-md w-full text-center space-y-8">
              <h4 className="text-3xl font-black uppercase italic tracking-tighter text-white">COMMAND LOGIN</h4>
              <input type="password" value={passInput} onChange={e => setPassInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkLead()} placeholder="CODE..." className="w-full bg-slate-950 border border-white/10 rounded-3xl px-6 py-5 text-amber-500 font-black text-center focus:border-amber-500 outline-none text-xl" autoFocus />
              <button onClick={checkLead} className="w-full py-5 bg-amber-500 text-black rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-amber-500/20">ACCÉDER</button>
            </div>
          </div>
        )}

        {/* CALENDAR SELECT MODAL */}
        {selectedDate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-xl">
             <div className="glass-panel w-full max-w-2xl rounded-[4rem] p-12 border-amber-500/30">
                <div className="flex justify-between items-center mb-10">
                   <h5 className="text-4xl font-black uppercase italic tracking-tighter text-white">Affecter Conducteur</h5>
                   <button onClick={() => setSelectedDate(null)} className="text-slate-500 text-3xl font-bold">×</button>
                </div>
                <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-4 scrollbar-amber">
                   {fullDataset.map(p => (
                     <button key={p.name} onClick={() => handleAssign(p.name)} className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 hover:bg-amber-500 hover:text-black transition-all flex justify-between items-center group">
                        <span className="font-black text-[10px] uppercase">{p.name}</span>
                        <span className="text-[10px] opacity-40 group-hover:opacity-100">{p.squad}</span>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        )}

      </div>
      
      <style>{`
        .scrollbar-amber::-webkit-scrollbar { width: 4px; }
        .scrollbar-amber::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
