// Line-art croissant v duchu grafiky z Instagramu.
// Farba čiar = currentColor, výplň segmentov = CSS premenná --croissant-fill
// (nastaviť na farbu pozadia, aby sa prekrývajúce čiary schovali).
export default function CroissantIcon({ size = 64, strokeWidth = 1.6, title, ...props }) {
  const seg = (cx, cy, rx, ry, rot) => (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${rot} ${cx} ${cy})`} />
  )
  return (
    <svg
      viewBox="0 0 100 64"
      width={size}
      height={(size * 64) / 100}
      fill="var(--croissant-fill, none)"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      {seg(18, 46, 4.5, 7, -55)}
      {seg(82, 46, 4.5, 7, 55)}
      {seg(26, 40, 7.5, 11, -38)}
      {seg(74, 40, 7.5, 11, 38)}
      {seg(37, 34, 10.5, 15.5, -18)}
      {seg(63, 34, 10.5, 15.5, 18)}
      {seg(50, 32, 12.5, 19, 0)}
    </svg>
  )
}
