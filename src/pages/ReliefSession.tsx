import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Play, Pause } from "lucide-react";

/**
 * Relief Session — breathing orb + audio-session UX from the prototype.
 * Forced dark. Opens from Home's Relief tile and the log-complete flow.
 */

interface ReliefSessionProps {
  onClose: () => void;
  totalSeconds?: number;
}

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const ReliefSession = ({ onClose, totalSeconds = 720 }: ReliefSessionProps) => {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [showEnd, setShowEnd] = useState(false);

  useEffect(() => {
    if (!playing || showEnd) return;
    const id = setInterval(() => {
      setTime((t) => {
        const next = Math.min(t + 1, totalSeconds);
        if (next >= totalSeconds) setShowEnd(true);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, showEnd, totalSeconds]);

  const pct = (time / totalSeconds) * 100;

  if (showEnd) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col px-6 pt-14 pb-10 text-white"
        style={{ background: "#0E0E14" }}
      >
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/55 mb-3">
            Session complete
          </div>
          <h2
            className="text-[38px] font-medium tracking-tight leading-[1.05] m-0"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Did it <em className="italic" style={{ color: "#60A5FA" }}>help?</em>
          </h2>
          <p className="text-sm text-white/55 mt-2.5">
            Your answer trains the relief engine.
          </p>
          <div className="grid grid-cols-3 gap-2.5 mt-8">
            {[
              { e: "😌", l: "A lot" },
              { e: "🙂", l: "Some" },
              { e: "😐", l: "Not really" },
            ].map((b) => (
              <button
                key={b.l}
                onClick={onClose}
                className="rounded-[20px] p-5 flex flex-col gap-2 items-center text-white active:scale-[0.97] transition-transform"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-[32px]">{b.e}</span>
                <span className="text-xs font-semibold">{b.l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col text-white"
      style={{
        background: "radial-gradient(circle at 50% 30%, #1A1A28, #0E0E14 80%)",
      }}
    >
      {/* Top bar */}
      <div className="px-5 pt-14 flex justify-between items-center">
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-10 h-10 rounded-full bg-white/10 border-0 cursor-pointer flex items-center justify-center text-white"
        >
          <X className="w-[18px] h-[18px]" />
        </button>
        <div className="text-[11px] font-semibold tracking-wider text-white/55 uppercase">
          DARK MODE · MOTION REDUCED
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Breathing orb */}
        <div className="relative w-60 h-60 mb-10">
          {[1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(96,165,250,0.28) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.85, 0.4, 0.85] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          ))}
          <motion.div
            className="absolute inset-6 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.6), rgba(96,165,250,0.9) 55%, rgba(27,42,78,1) 100%)",
              boxShadow: "0 30px 80px rgba(59,130,246,0.35)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div
          className="text-center text-[28px] font-medium tracking-tight leading-tight text-white mb-1"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Breathe in for 4…
        </div>
        <div className="text-center text-sm text-white/55 max-w-[260px]">
          Guided 4-7-8 session · releases tension in the jaw and neck.
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-10">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-2.5">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #60A5FA, #7C3AED)",
            }}
          />
        </div>
        <div className="flex justify-between text-[11px] tabular-nums text-white/55 mb-4">
          <span>{fmt(time)}</span>
          <span>-{fmt(totalSeconds - time)}</span>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)",
              boxShadow: "0 12px 30px rgba(59,130,246,0.45)",
            }}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-6 h-6 fill-white" strokeWidth={0} />
            ) : (
              <Play className="w-6 h-6 fill-white ml-[2px]" strokeWidth={0} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReliefSession;
