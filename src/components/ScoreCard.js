import { getScoreColor } from '@/lib/scoring';

const RING_RADIUS = 42;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function ScoreCard({ food, points }) {
  const sc = getScoreColor(food.score);
  const offset = RING_CIRCUMFERENCE - (food.score / 100) * RING_CIRCUMFERENCE;

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #122a20, #1e3f30)', border: '1px solid #C9A84C40' }}>
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative w-[96px] h-[96px] flex-shrink-0">
            <svg viewBox="0 0 96 96" className="w-full h-full score-ring" aria-hidden="true">
              <circle cx="48" cy="48" r={RING_RADIUS} fill="none" stroke="#ffffff10" strokeWidth="6" />
              <circle cx="48" cy="48" r={RING_RADIUS} fill="none" stroke={sc.bg} strokeWidth="6"
                strokeLinecap="round" strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={offset}
                style={{ animation: 'scoreReveal 1.2s ease-out forwards' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[28px] font-bold text-white">{food.score}</span>
              <span className="text-[10px] text-white/60 -mt-1">/ 100</span>
            </div>
            <span className="sr-only">Clean Score {food.score} out of 100</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/90 text-[18px] font-semibold"><span aria-hidden="true">{food.icon} </span>{food.name}</p>
            <p className="text-white/60 text-[12px]">{food.category}</p>
            <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: sc.bg + '25', color: sc.text }}>
              {sc.label}
            </span>
          </div>
        </div>

        <p className="text-white/70 text-[13px] leading-snug mb-3">{food.feedback}</p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Fiber', value: food.fiber },
            { label: 'Additives', value: food.additives },
            { label: 'Whole Foods', value: food.whole },
          ].map(s => (
            <div key={s.label} className="bg-white/5 rounded-lg p-2 text-center">
              <p className="text-white/60 text-[10px]">{s.label}</p>
              <p className="text-white/90 text-[13px] font-medium">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#C9A84C20] rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-[#C9A84C] text-[12px] font-medium">Points earned</span>
          <span className="text-[#C9A84C] text-[16px] font-bold">+{points}</span>
        </div>

        {food.demo && (
          <p className="text-white/60 text-[10px] text-center mt-2">
            Demo mode — canned score from the stub scorer, not your photo
          </p>
        )}
      </div>
    </div>
  );
}
