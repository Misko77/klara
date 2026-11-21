import { useId } from 'react'

// Line-art croissant z 9 samostatných dielov (oválov) v duchu grafiky z Instagramu.
// Diely sú zoradené odzadu (špičky) dopredu (stred). Každý diel je maskovaný dielmi
// pred ním, takže sa čiary neprekrývajú – funguje na akomkoľvek pozadí.
// [cx, cy, rx, ry, rotácia]
const SEGMENTS = [
  [10, 46, 3, 7, -60],
  [90, 46, 3, 7, 60],
  [18.5, 42, 4, 10, -47],
  [81.5, 42, 4, 10, 47],
  [28, 37.5, 5.2, 13.5, -32],
  [72, 37.5, 5.2, 13.5, 32],
  [38.5, 34, 6.5, 17.5, -16],
  [61.5, 34, 6.5, 17.5, 16],
  [50, 32, 8.2, 21.5, 0],
]

const Seg = ({ s: [cx, cy, rx, ry, rot], ...props }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} {...props} />
)

export default function CroissantIcon({ size = 64, strokeWidth = 1.1, title, ...props }) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 100 64"
      width={size}
      height={(size * 64) / 100}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <defs>
        {SEGMENTS.map((_, i) => (
          <mask key={i} id={`${id}-${i}`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="84">
            <rect x="-10" y="-10" width="120" height="84" fill="white" />
            {SEGMENTS.slice(i + 1).map((s, j) => (
              <Seg key={j} s={s} fill="black" stroke="black" />
            ))}
          </mask>
        ))}
      </defs>
      {SEGMENTS.map((s, i) => (
        <Seg key={i} s={s} mask={`url(#${id}-${i})`} />
      ))}
    </svg>
  )
}
