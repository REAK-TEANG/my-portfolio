import Parallax from './Parallax';

/**
 * Decorative stickers scattered behind a section, each drifting at its own speed
 * so the page feels layered like a real scrapbook. Pure decoration (hidden from
 * assistive tech, ignores clicks, hidden on very small screens).
 *
 * items: [{ name, Icon, pos, color, border, speed, rotate }]
 */
export default function Doodles({ items }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      {items.map(({ name, Icon, pos, color, border = 'border-ink', speed, rotate }) => (
        <Parallax key={name} speed={speed} className={`absolute ${pos}`}>
          <div
            className={`w-14 h-14 md:w-20 md:h-20 ${color} ${border} border-2 rounded-2xl flex items-center justify-center shadow-[4px_4px_0_0_rgba(43,42,41,0.35)]`}
            style={{ rotate }}
          >
            <Icon size={36} weight="bold" className="text-ink" />
          </div>
        </Parallax>
      ))}
    </div>
  );
}
