type Props = {
  from: 'blue' | 'white'
}

const BLUE = '#0a1233'
const WHITE = '#ffffff'

// Jagged edge, right-to-left, drawn at y around 20-36 to give it a torn feel.
const RTL_JAGGED = [
  [1170, 12], [1120, 32], [1060, 16], [1000, 28], [940, 10],
  [880, 30], [820, 14], [760, 34], [700, 8], [640, 28],
  [580, 12], [530, 36], [480, 18], [430, 32], [380, 10],
  [330, 34], [285, 14], [240, 30], [195, 8], [150, 28],
  [110, 12], [70, 32], [40, 18],
]
  .map(([x, y]) => `L${x},${y}`)
  .join(' ')

export default function PaperTear({ from }: Props) {
  const top = from === 'blue' ? BLUE : WHITE
  const bottom = from === 'blue' ? WHITE : BLUE
  return (
    <div className="relative -my-px h-12 w-full" style={{ background: bottom }}>
      <svg
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <path d={`M0,0 L1200,0 L1200,24 ${RTL_JAGGED} L0,20 Z`} fill={top} />
      </svg>
    </div>
  )
}
