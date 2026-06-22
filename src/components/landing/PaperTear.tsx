type Props = {
  from: string
  to: string
}

// Build a dense, fibrous tear-path deterministically (SSR-safe).
// Many small irregular spikes, varied y, varied spacing.
function buildTearPath(): string {
  const W = 1440
  const H = 80
  const segs: string[] = []
  let x = W
  let i = 0
  while (x > 4) {
    // Multi-frequency sine produces an organic feel without RNG.
    const n =
      Math.sin(i * 0.71) * 0.4 +
      Math.sin(i * 1.31 + 0.6) * 0.28 +
      Math.sin(i * 2.13 + 1.4) * 0.18 +
      Math.sin(i * 3.97 + 2.2) * 0.14
    const y = Math.max(12, Math.min(64, 40 + n * 28))
    segs.push(`L${x.toFixed(1)},${y.toFixed(1)}`)
    // Spacing varies 5-18 → ~80–120 points across width
    const space = 5 + Math.abs(Math.sin(i * 1.7 + 0.3)) * 13
    x -= space
    i++
  }
  segs.push(`L0,${(40 + Math.sin(i * 0.4) * 18).toFixed(1)}`)
  const yFirst = (40 + Math.sin(-0.5) * 22).toFixed(1)
  return `M0,${H} L${W},${H} L${W},${yFirst} ${segs.join(' ')} Z`
}

const TEAR_PATH = buildTearPath()

export default function PaperTear({ from, to }: Props) {
  const idKey = (from + to).replace(/[^a-zA-Z0-9]/g, '')
  const shadowId = `tear-shadow-${idKey}`

  return (
    <div
      className="w-full relative"
      style={{ background: from, lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block w-full h-16 md:h-24"
        aria-hidden
      >
        <defs>
          <filter
            id={shadowId}
            x="-2%"
            y="-50%"
            width="104%"
            height="200%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* main torn paper */}
        <path d={TEAR_PATH} fill={to} filter={`url(#${shadowId})`} />

        {/* faint definition stroke right on the tear edge */}
        <path
          d={TEAR_PATH}
          fill="none"
          stroke="rgba(0,0,0,0.16)"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  )
}
