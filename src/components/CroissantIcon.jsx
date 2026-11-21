// Line-art croissant z 9 samostatných dielov (oválov) v duchu grafiky z Instagramu.
// Susedné diely sa presne dotýkajú (vypočítané), neprekrývajú sa.
// [cx, cy, rx, ry, rotácia]
const SEGMENTS = [
  [8.93, 53.35, 3.33, 7.76, -60],
  [91.07, 53.35, 3.33, 7.76, 60],
  [13.18, 46.54, 4.44, 11.09, -47],
  [86.82, 46.54, 4.44, 11.09, 47],
  [20.88, 39.1, 5.77, 14.97, -32],
  [79.12, 39.1, 5.77, 14.97, 32],
  [33.02, 32.65, 7.21, 19.41, -16],
  [66.98, 32.65, 7.21, 19.41, 16],
  [50, 29.65, 9.1, 23.85, 0],
]

export default function CroissantIcon({ size = 64, strokeWidth = 1.1, title, ...props }) {
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
      {SEGMENTS.map(([cx, cy, rx, ry, rot]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} />
      ))}
    </svg>
  )
}
