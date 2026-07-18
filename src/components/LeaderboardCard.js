import { CHALLENGE } from '@/lib/demo-data';

export default function LeaderboardCard({ groups, userPts, userStreak }) {
  const entries = [
    ...groups.map(g => ({ ...g, isUser: false })),
    { name: 'You', pts: userPts, streak: userStreak, isUser: true },
  ]
    .sort((a, b) => b.pts - a.pts)
    .map((e, i) => ({ ...e, rank: i + 1 }));

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#14261e', border: '1px solid #ffffff10' }}>
      <div className="p-3">
        <p className="text-white/90 text-[14px] font-semibold mb-2"><span aria-hidden="true">🏆 </span>Leaderboard · {CHALLENGE.name}</p>
        <ol className="space-y-1.5">
          {entries.map(e => (
            <li key={e.name} className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg ${e.isUser ? 'bg-[#C9A84C15] border border-[#C9A84C40]' : ''}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0
                ${e.rank === 1 ? 'bg-[#C9A84C] text-[#14261e]' : e.isUser ? 'bg-[#C9A84C40] text-[#C9A84C]' : 'bg-white/10 text-white/50'}`}>
                {e.rank}
              </span>
              <span className={`flex-1 text-[13px] font-medium truncate ${e.isUser ? 'text-[#C9A84C]' : 'text-white/80'}`}>
                {e.name}
              </span>
              <span className="text-white/60 text-[11px]">
                <span aria-hidden="true">🔥</span>{e.streak}<span className="sr-only">-day streak</span>
              </span>
              <span className={`text-[13px] font-bold tabular-nums ${e.isUser ? 'text-[#C9A84C]' : 'text-white/60'}`}>
                {e.pts.toLocaleString()}<span className="sr-only"> points</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
