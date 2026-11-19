import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smiley, Star, Heart, Lightning, Flower, Wrench, Gear, Car, Rocket, PencilSimple,
} from '@phosphor-icons/react';
import { ScrollHeading } from './Reveal';

const KINDS = [
  { id: 'smiley', Icon: Smiley, bg: 'bg-accent-pink', shape: 'rounded-full' },
  { id: 'star', Icon: Star, bg: 'bg-accent-yellow', shape: 'torn-edge' },
  { id: 'car', Icon: Car, bg: 'bg-accent-blue', shape: 'rounded-2xl' },
  { id: 'wrench', Icon: Wrench, bg: 'bg-accent-green', shape: 'rounded-full' },
  { id: 'heart', Icon: Heart, bg: 'bg-accent-pink', shape: 'rounded-2xl' },
  { id: 'gear', Icon: Gear, bg: 'bg-accent-yellow', shape: 'rounded-full' },
  { id: 'bolt', Icon: Lightning, bg: 'bg-accent-green', shape: 'torn-edge' },
  { id: 'flower', Icon: Flower, bg: 'bg-accent-blue', shape: 'rounded-full' },
  { id: 'rocket', Icon: Rocket, bg: 'bg-accent-pink', shape: 'rounded-2xl' },
  { id: 'pencil', Icon: PencilSimple, bg: 'bg-accent-yellow', shape: 'torn-edge' },
];

const SIZE = 84;
let uid = 0;

const rand = (min, max) => Math.random() * (max - min) + min;

function makeSticker(kindId, board) {
  const w = board?.clientWidth ?? 800;
  const h = board?.clientHeight ?? 520;
  return {
    uid: ++uid,
    kind: kindId,
    x: rand(10, Math.max(20, w - SIZE - 10)),
    y: rand(10, Math.max(20, h - SIZE - 10)),
    rotate: rand(-18, 18),
    scale: rand(0.9, 1.35),
  };
}

export default function Playground() {
  const boardRef = useRef(null);
  const topZ = useRef(10);
  const [items, setItems] = useState([]);

  const seed = useCallback(() => {
    const kinds = ['smiley', 'star', 'car', 'wrench', 'heart', 'gear', 'bolt', 'flower'];
    setItems(kinds.map((k) => Object.assign(makeSticker(k, boardRef.current), { z: ++topZ.current })));
  }, []);

  useEffect(() => { seed(); }, [seed]);

  const add = (kindId) =>
    setItems((prev) => [...prev, { ...makeSticker(kindId, boardRef.current), z: ++topZ.current }].slice(-40));

  const shuffle = () =>
    setItems((prev) => prev.map((s) => Object.assign(makeSticker(s.kind, boardRef.current), { uid: s.uid, z: s.z })));

  const remove = (id) => setItems((prev) => prev.filter((s) => s.uid !== id));

  const bringToFront = (id) =>
    setItems((prev) => prev.map((s) => (s.uid === id ? { ...s, z: ++topZ.current } : s)));

  return (
    <section id="playground" className="py-28 px-4 border-t-2 border-ink border-dashed relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <ScrollHeading className="font-display text-2xl sm:text-3xl md:text-6xl text-ink uppercase inline-block relative">
          A little space to play
          <span className="absolute -bottom-6 right-0 font-handwriting text-accent-blue text-2xl rotate-6 normal-case">
            (go on, grab one!)
          </span>
        </ScrollHeading>

        {/* Sticker tray */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-3">
          <span className="font-mono text-sm font-bold uppercase text-ink/60 mr-1">Add a sticker:</span>
          {KINDS.map(({ id, Icon, bg, shape }) => (
            <motion.button
              key={id}
              whileHover={{ y: -6, rotate: 8 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => add(id)}
              aria-label={`Add ${id} sticker`}
              className={`w-12 h-12 ${bg} ${shape} border-2 border-ink flex items-center justify-center shadow-[3px_3px_0_0_#2b2a29]`}
            >
              <Icon size={24} weight="bold" className="text-ink" />
            </motion.button>
          ))}
        </div>

        {/* Board */}
        <div
          ref={boardRef}
          className="relative mt-8 h-[520px] w-full border-2 border-ink border-dashed rounded-2xl bg-white/60 overflow-hidden select-none"
          style={{ backgroundImage: 'radial-gradient(circle, #2b2a29 1px, transparent 1px)', backgroundSize: '26px 26px', backgroundPosition: '0 0' }}
        >
          {items.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center font-handwriting text-3xl text-ink/40">
              empty board… add some stickers ✿
            </p>
          )}

          <AnimatePresence>
            {items.map((s) => {
              const kind = KINDS.find((k) => k.id === s.kind);
              const { Icon } = kind;
              return (
                <motion.div
                  key={s.uid}
                  drag
                  dragConstraints={boardRef}
                  dragElastic={0.15}
                  dragMomentum
                  onPointerDown={() => bringToFront(s.uid)}
                  onDoubleClick={() => remove(s.uid)}
                  initial={{ scale: 0, rotate: s.rotate - 90, opacity: 0 }}
                  animate={{ scale: s.scale, rotate: s.rotate, opacity: 1, left: s.x, top: s.y }}
                  exit={{ scale: 0, opacity: 0, rotate: s.rotate + 90, transition: { duration: 0.2 } }}
                  whileHover={{ scale: s.scale * 1.1 }}
                  whileTap={{ scale: s.scale * 1.2, rotate: 0 }}
                  whileDrag={{ scale: s.scale * 1.25, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className={`absolute cursor-grab active:cursor-grabbing ${kind.bg} ${kind.shape} border-2 border-ink flex items-center justify-center shadow-[5px_5px_0_0_#2b2a29]`}
                  style={{ width: SIZE, height: SIZE, zIndex: s.z }}
                >
                  <Icon size={44} weight="bold" className="text-ink pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={shuffle}
            className="px-5 py-2 bg-accent-yellow border-2 border-ink font-mono font-bold uppercase shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Shuffle
          </button>
          <button
            onClick={seed}
            className="px-5 py-2 bg-accent-green border-2 border-ink font-mono font-bold uppercase shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Reset
          </button>
          <button
            onClick={() => setItems([])}
            className="px-5 py-2 bg-white border-2 border-ink font-mono font-bold uppercase shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Clear
          </button>
          <span className="font-handwriting text-2xl text-ink/60">drag to move · double-click to pop</span>
        </div>
      </div>
    </section>
  );
}
