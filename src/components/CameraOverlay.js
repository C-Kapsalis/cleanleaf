import { CHALLENGE } from '@/lib/demo-data';

const CORNER_POSITIONS = [
  'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl',
  'top-0 right-0 border-t-2 border-r-2 rounded-tr-xl',
  'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl',
  'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl',
];

export default function CameraOverlay({ onCapture, onCancel, videoRef }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" style={{ height: '100dvh' }}
      role="dialog" aria-modal="true" aria-label="Camera — scan your meal">
      <div className="bg-black/80 backdrop-blur px-4 py-3 flex items-center justify-between z-10">
        <div>
          <p className="text-white text-[14px] font-semibold">{CHALLENGE.emoji} {CHALLENGE.name} · Day {CHALLENGE.day}</p>
          <p className="text-white/50 text-[11px]">Snap your meal to log it and earn points</p>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted
          className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="w-[250px] h-[250px] relative">
            {CORNER_POSITIONS.map(cls => (
              <div key={cls} className={`absolute w-12 h-12 border-[#25D366] corner-bracket ${cls}`} />
            ))}
            <div className="absolute left-2 right-2 h-0.5 bg-[#25D366] opacity-60 scan-line" />
          </div>
        </div>

        <div className="absolute bottom-24 left-0 right-0 text-center">
          <span className="bg-black/50 backdrop-blur-sm text-white/80 text-[13px] px-4 py-1.5 rounded-full">
            Position your meal in the frame
          </span>
        </div>
      </div>

      <div className="bg-black/80 backdrop-blur px-6 py-5 flex items-center justify-between">
        <button onClick={onCancel} className="text-white/70 text-[15px] font-medium px-4 py-2">
          Cancel
        </button>
        <button onClick={onCapture} aria-label="Take photo"
          className="w-[70px] h-[70px] rounded-full border-[3px] border-white flex items-center justify-center active:scale-95 transition-transform">
          <div className="w-[58px] h-[58px] rounded-full bg-[#25D366]" />
        </button>
        <div className="w-16" aria-hidden="true" />
      </div>
    </div>
  );
}
