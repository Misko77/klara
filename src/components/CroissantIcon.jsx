import { useId } from 'react'

// Line-art croissant z boku v duchu grafiky z Instagramu.
// Farba čiar = currentColor. Záhyby cesta sú orezané obrysom (clipPath),
// takže vždy presne dosadnú na okraj.
const CROISSANT_OUTLINE =
  'M4 52 C2 46 7 38 15 33 C22 18 36 10 50 10 C64 10 78 18 85 33 C93 38 98 46 96 52 C92 55 86 54 79 50 C70 55 60 57 50 57 C40 57 30 55 21 50 C14 54 8 55 4 52 Z'

const CROISSANT_FOLDS = [
  'M39 4 C30 22 30 46 37 62',
  'M61 4 C70 22 70 46 63 62',
  'M27 11 C17 28 17 46 23 60',
  'M73 11 C83 28 83 46 77 60',
  'M17 23 C9 36 8 48 11 60',
  'M83 23 C91 36 92 48 89 60',
]

export default function CroissantIcon({ size = 64, strokeWidth = 1.6, title, ...props }) {
  const clipId = useId()
  return (
    <svg
      viewBox="0 0 100 64"
      width={size}
      height={(size * 64) / 100}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <defs>
        <clipPath id={clipId}>
          <path d={CROISSANT_OUTLINE} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {CROISSANT_FOLDS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d={CROISSANT_OUTLINE} />
    </svg>
  )
}
