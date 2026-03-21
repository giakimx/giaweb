import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Trophy, RotateCcw, Eye } from 'lucide-react';

interface StateData {
  d: string;
  cx: number;
  cy: number;
  abbreviation: string;
}

const STATES: Record<string, StateData> = {
  'Alabama': { abbreviation: 'AL', cx: 623, cy: 393, d: 'M612,348 L608,432 L631,434 L640,415 L641,372 L628,348 Z' },
  'Alaska': { abbreviation: 'AK', cx: 110, cy: 510, d: 'M38,462 L38,558 L183,558 L183,462 Z' },
  'Arizona': { abbreviation: 'AZ', cx: 228, cy: 412, d: 'M162,372 L160,385 L228,456 L293,456 L294,406 L248,363 Z' },
  'Arkansas': { abbreviation: 'AR', cx: 572, cy: 345, d: 'M527,316 L525,374 L619,374 L620,318 Z' },
  'California': { abbreviation: 'CA', cx: 148, cy: 360, d: 'M73,230 L70,482 L122,490 L175,484 L222,383 L270,337 L268,292 L237,258 L175,230 Z' },
  'Colorado': { abbreviation: 'CO', cx: 342, cy: 292, d: 'M273,255 L412,255 L412,330 L273,330 Z' },
  'Connecticut': { abbreviation: 'CT', cx: 827, cy: 202, d: 'M813,190 L811,215 L842,215 L844,190 Z' },
  'Delaware': { abbreviation: 'DE', cx: 796, cy: 240, d: 'M786,223 L784,258 L806,258 L807,223 Z' },
  'Florida': { abbreviation: 'FL', cx: 683, cy: 458, d: 'M617,418 L617,498 L685,498 L748,450 L745,418 Z' },
  'Georgia': { abbreviation: 'GA', cx: 678, cy: 383, d: 'M636,332 L635,435 L720,435 L742,357 L718,332 Z' },
  'Hawaii': { abbreviation: 'HI', cx: 238, cy: 491, d: 'M190,470 L188,512 L287,512 L290,470 Z' },
  'Idaho': { abbreviation: 'ID', cx: 230, cy: 181, d: 'M183,120 L181,243 L252,243 L283,218 L283,183 L253,120 Z' },
  'Illinois': { abbreviation: 'IL', cx: 609, cy: 265, d: 'M580,215 L577,315 L642,315 L644,258 L624,215 Z' },
  'Indiana': { abbreviation: 'IN', cx: 659, cy: 256, d: 'M630,215 L627,298 L688,298 L690,215 Z' },
  'Iowa': { abbreviation: 'IA', cx: 546, cy: 231, d: 'M498,200 L495,263 L595,263 L597,200 Z' },
  'Kansas': { abbreviation: 'KS', cx: 461, cy: 305, d: 'M395,280 L393,330 L528,330 L530,280 Z' },
  'Kentucky': { abbreviation: 'KY', cx: 685, cy: 311, d: 'M613,287 L610,335 L748,335 L760,308 L720,287 Z' },
  'Louisiana': { abbreviation: 'LA', cx: 575, cy: 410, d: 'M523,375 L520,445 L630,445 L632,375 Z' },
  'Maine': { abbreviation: 'ME', cx: 872, cy: 142, d: 'M838,105 L835,180 L910,180 L913,105 Z' },
  'Maryland': { abbreviation: 'MD', cx: 780, cy: 264, d: 'M748,250 L745,278 L812,278 L815,250 Z' },
  'Massachusetts': { abbreviation: 'MA', cx: 837, cy: 181, d: 'M803,165 L800,198 L873,198 L875,165 Z' },
  'Michigan': { abbreviation: 'MI', cx: 647, cy: 188, d: 'M608,145 L605,232 L668,232 L688,185 L688,145 Z' },
  'Minnesota': { abbreviation: 'MN', cx: 530, cy: 153, d: 'M490,98 L488,208 L575,208 L578,162 L553,155 L565,98 Z' },
  'Mississippi': { abbreviation: 'MS', cx: 611, cy: 384, d: 'M582,338 L580,430 L641,430 L643,380 L643,338 Z' },
  'Missouri': { abbreviation: 'MO', cx: 563, cy: 287, d: 'M510,252 L508,323 L618,323 L620,295 L575,252 Z' },
  'Montana': { abbreviation: 'MT', cx: 285, cy: 148, d: 'M188,98 L185,198 L385,198 L388,152 L352,98 Z' },
  'Nebraska': { abbreviation: 'NE', cx: 460, cy: 258, d: 'M393,233 L390,283 L528,283 L530,233 Z' },
  'Nevada': { abbreviation: 'NV', cx: 200, cy: 305, d: 'M148,235 L145,375 L232,375 L270,310 L272,235 Z' },
  'New Hampshire': { abbreviation: 'NH', cx: 849, cy: 162, d: 'M838,128 L836,197 L861,197 L862,128 Z' },
  'New Jersey': { abbreviation: 'NJ', cx: 804, cy: 224, d: 'M790,200 L787,248 L818,248 L820,200 Z' },
  'New Mexico': { abbreviation: 'NM', cx: 314, cy: 385, d: 'M253,330 L250,440 L378,440 L380,330 Z' },
  'New York': { abbreviation: 'NY', cx: 800, cy: 184, d: 'M752,140 L748,228 L843,228 L860,183 L838,140 Z' },
  'North Carolina': { abbreviation: 'NC', cx: 736, cy: 327, d: 'M668,295 L665,360 L803,360 L808,318 L755,295 Z' },
  'North Dakota': { abbreviation: 'ND', cx: 460, cy: 135, d: 'M390,100 L388,170 L530,170 L532,100 Z' },
  'Ohio': { abbreviation: 'OH', cx: 703, cy: 255, d: 'M660,213 L657,298 L747,298 L750,213 Z' },
  'Oklahoma': { abbreviation: 'OK', cx: 475, cy: 351, d: 'M393,328 L390,375 L537,375 L568,347 L533,328 Z' },
  'Oregon': { abbreviation: 'OR', cx: 188, cy: 230, d: 'M108,175 L106,285 L283,285 L285,218 L183,175 Z' },
  'Pennsylvania': { abbreviation: 'PA', cx: 763, cy: 226, d: 'M720,190 L717,262 L808,262 L813,218 L797,190 Z' },
  'Rhode Island': { abbreviation: 'RI', cx: 851, cy: 202, d: 'M841,190 L838,215 L860,215 L862,190 Z' },
  'South Carolina': { abbreviation: 'SC', cx: 722, cy: 369, d: 'M688,330 L685,408 L760,408 L762,330 Z' },
  'South Dakota': { abbreviation: 'SD', cx: 460, cy: 205, d: 'M390,170 L388,240 L530,240 L532,170 Z' },
  'Tennessee': { abbreviation: 'TN', cx: 675, cy: 337, d: 'M598,312 L593,363 L753,363 L758,335 L718,312 Z' },
  'Texas': { abbreviation: 'TX', cx: 462, cy: 433, d: 'M360,368 L358,498 L567,498 L570,438 L543,368 Z' },
  'Utah': { abbreviation: 'UT', cx: 233, cy: 310, d: 'M193,250 L190,370 L280,370 L282,250 Z' },
  'Vermont': { abbreviation: 'VT', cx: 830, cy: 155, d: 'M818,130 L815,180 L843,180 L845,130 Z' },
  'Virginia': { abbreviation: 'VA', cx: 757, cy: 282, d: 'M707,252 L703,312 L808,312 L815,285 L800,252 Z' },
  'Washington': { abbreviation: 'WA', cx: 194, cy: 139, d: 'M113,98 L111,180 L283,180 L303,152 L270,98 Z' },
  'West Virginia': { abbreviation: 'WV', cx: 730, cy: 292, d: 'M702,255 L699,330 L762,330 L765,292 L748,255 Z' },
  'Wisconsin': { abbreviation: 'WI', cx: 600, cy: 174, d: 'M563,128 L560,220 L648,220 L650,175 L625,128 Z' },
  'Wyoming': { abbreviation: 'WY', cx: 305, cy: 230, d: 'M235,190 L232,270 L378,270 L380,190 Z' },
};

const STATE_NAMES = Object.keys(STATES);
const TOTAL = STATE_NAMES.length;
const GAME_DURATION = 15 * 60; // 15 minutes

// Common alternate names / abbreviations players might type
const ALIASES: Record<string, string> = {
  'new york city': 'New York',
  'nyc': 'New York',
  'dc': 'Maryland',
  'new england': '',
};

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Build lookup map including abbreviations
const buildLookup = (): Map<string, string> => {
  const map = new Map<string, string>();
  for (const name of STATE_NAMES) {
    map.set(normalize(name), name);
    map.set(normalize(STATES[name].abbreviation), name);
  }
  return map;
};

const STATE_LOOKUP = buildLookup();

interface USStatesGameProps {
  onBack?: () => void;
}

type GamePhase = 'intro' | 'playing' | 'finished';

const USStatesGame: React.FC<USStatesGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [lastGuessed, setLastGuessed] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      setPhase('finished');
      return;
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft]);

  // Focus input when playing
  useEffect(() => {
    if (phase === 'playing') {
      inputRef.current?.focus();
    }
  }, [phase]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const match = STATE_LOOKUP.get(normalize(value));
    if (match && !guessed.has(match)) {
      setGuessed(prev => {
        const next = new Set(prev);
        next.add(match);
        return next;
      });
      setLastGuessed(match);
      setInput('');
      setTimeout(() => setLastGuessed(null), 1500);

      if (guessed.size + 1 === TOTAL) {
        setPhase('finished');
      }
    }
  };

  const handleStart = () => {
    setPhase('playing');
    setGuessed(new Set());
    setInput('');
    setTimeLeft(GAME_DURATION);
    setRevealed(false);
    setLastGuessed(null);
  };

  const handleReset = () => {
    setPhase('intro');
    setGuessed(new Set());
    setInput('');
    setTimeLeft(GAME_DURATION);
    setRevealed(false);
    setLastGuessed(null);
  };

  const handleGiveUp = () => {
    setPhase('finished');
    setRevealed(true);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const missedStates = STATE_NAMES.filter(n => !guessed.has(n));
  const score = guessed.size;
  const pct = Math.round((score / TOTAL) * 100);

  const getStateColor = (name: string) => {
    if (guessed.has(name)) {
      if (lastGuessed === name) return '#22c55e'; // flash green
      return '#4ade80';
    }
    if (revealed) return '#fca5a5'; // missed = red
    return '#e5e7eb';
  };

  const getStateStroke = (name: string) => {
    if (hoveredState === name) return '#374151';
    return '#9ca3af';
  };

  return (
    <div className="min-h-screen bg-dot-pattern text-neutral-900 font-sans">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4 border-b border-neutral-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono-accent uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        )}
        <span className="font-serif-accent text-xl font-medium">US States Quiz</span>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Intro screen */}
        {phase === 'intro' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
            <div className="space-y-3">
              <span className="font-mono-accent text-xs text-neutral-400 uppercase tracking-widest">Geography Quiz</span>
              <h1 className="font-serif-accent text-4xl md:text-6xl font-medium">Name all 50 States</h1>
              <p className="text-neutral-500 text-sm font-mono-accent max-w-md">
                Type state names to fill in the blank map. You have <strong>15 minutes</strong> — how many can you name?
              </p>
            </div>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-neutral-900 text-white text-sm font-mono-accent uppercase tracking-widest rounded-full hover:bg-neutral-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Playing / Finished */}
        {phase !== 'intro' && (
          <>
            {/* Stats bar */}
            <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-6 py-4 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-serif-accent text-3xl font-semibold">{score}</div>
                  <div className="font-mono-accent text-[10px] uppercase tracking-widest text-neutral-400">of {TOTAL}</div>
                </div>
                <div className="h-10 w-px bg-neutral-100" />
                <div className="text-center">
                  <div className="font-serif-accent text-3xl font-semibold">{pct}%</div>
                  <div className="font-mono-accent text-[10px] uppercase tracking-widest text-neutral-400">complete</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {phase === 'playing' && (
                  <>
                    <div className={`flex items-center gap-2 font-mono-accent text-lg ${timeLeft < 60 ? 'text-red-500' : 'text-neutral-700'}`}>
                      <Clock size={16} />
                      {formatTime(timeLeft)}
                    </div>
                    <div className="h-6 w-px bg-neutral-200" />
                    <button
                      onClick={handleGiveUp}
                      className="flex items-center gap-1.5 text-xs font-mono-accent uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Eye size={13} />
                      Give up
                    </button>
                  </>
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-mono-accent uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              </div>
            </div>

            {/* Input */}
            {phase === 'playing' && (
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInput}
                  placeholder="Type a state name..."
                  className="w-full border border-neutral-200 rounded-xl px-6 py-4 text-sm font-mono-accent focus:outline-none focus:border-neutral-900 transition-colors bg-white shadow-sm placeholder-neutral-400"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                {lastGuessed && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 font-mono-accent text-sm font-semibold animate-bounce">
                    ✓ {lastGuessed}
                  </div>
                )}
              </div>
            )}

            {/* Finished banner */}
            {phase === 'finished' && (
              <div className={`rounded-xl border px-6 py-5 flex items-center justify-between ${score === TOTAL ? 'bg-green-50 border-green-200' : 'bg-neutral-50 border-neutral-200'}`}>
                <div className="flex items-center gap-3">
                  <Trophy size={20} className={score === TOTAL ? 'text-green-600' : 'text-neutral-500'} />
                  <div>
                    <div className="font-serif-accent text-xl font-medium">
                      {score === TOTAL ? 'Perfect score! 🎉' : `You got ${score} of ${TOTAL} states`}
                    </div>
                    <div className="font-mono-accent text-xs text-neutral-500 uppercase tracking-widest">
                      {score === TOTAL ? 'All 50 states named!' : `${TOTAL - score} missed`}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-neutral-900 text-white text-xs font-mono-accent uppercase tracking-widest rounded-full hover:bg-neutral-700 transition-colors"
                >
                  Play again
                </button>
              </div>
            )}

            {/* SVG Map */}
            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm p-2 md:p-4">
              <svg
                viewBox="0 0 960 600"
                className="w-full h-auto"
                style={{ maxHeight: '520px' }}
                onClick={() => phase === 'playing' && inputRef.current?.focus()}
              >
                {/* Inset labels */}
                <text x="38" y="458" className="font-mono-accent" style={{ fontSize: 9, fill: '#9ca3af' }}>ALASKA</text>
                <text x="190" y="466" className="font-mono-accent" style={{ fontSize: 9, fill: '#9ca3af' }}>HAWAII</text>

                {/* Inset borders */}
                <rect x="35" y="460" width="150" height="100" fill="none" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="3,2" />
                <rect x="188" y="468" width="103" height="46" fill="none" stroke="#d1d5db" strokeWidth="0.5" strokeDasharray="3,2" />

                {STATE_NAMES.map(name => {
                  const state = STATES[name];
                  const isGuessed = guessed.has(name);
                  const isMissed = revealed && !isGuessed;
                  const isHovered = hoveredState === name;
                  const fill = getStateColor(name);
                  const stroke = getStateStroke(name);

                  return (
                    <g
                      key={name}
                      onMouseEnter={() => setHoveredState(name)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <path
                        d={state.d}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isHovered ? 1.5 : 0.8}
                        style={{ transition: 'fill 0.3s ease' }}
                      />
                      {/* Label: show abbreviation if guessed or revealed */}
                      {(isGuessed || isMissed) && (
                        <text
                          x={state.cx}
                          y={state.cy + 4}
                          textAnchor="middle"
                          style={{
                            fontSize: 8,
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            fill: isGuessed ? '#166534' : '#991b1b',
                            pointerEvents: 'none',
                            userSelect: 'none',
                          }}
                        >
                          {state.abbreviation}
                        </text>
                      )}
                      {/* Tooltip on hover for guessed states */}
                      {isHovered && isGuessed && (
                        <text
                          x={state.cx}
                          y={state.cy - 8}
                          textAnchor="middle"
                          style={{
                            fontSize: 7,
                            fontFamily: 'monospace',
                            fill: '#166534',
                            pointerEvents: 'none',
                          }}
                        >
                          {name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Guessed list */}
            {phase === 'playing' && guessed.size > 0 && (
              <div className="bg-white border border-neutral-200 rounded-xl p-4">
                <div className="font-mono-accent text-[10px] uppercase tracking-widest text-neutral-400 mb-3">Guessed</div>
                <div className="flex flex-wrap gap-1.5">
                  {[...guessed].sort().map(name => (
                    <span key={name} className="px-2 py-1 bg-green-50 border border-green-200 rounded text-[11px] font-mono-accent text-green-700">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missed list after game over */}
            {phase === 'finished' && missedStates.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-xl p-4">
                <div className="font-mono-accent text-[10px] uppercase tracking-widest text-neutral-400 mb-3">You missed ({missedStates.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {missedStates.sort().map(name => (
                    <span key={name} className="px-2 py-1 bg-red-50 border border-red-200 rounded text-[11px] font-mono-accent text-red-600">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default USStatesGame;
