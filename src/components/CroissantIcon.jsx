import { useId } from 'react'

// Line-art croissant ako polmesiac s rovnomernou hrúbkou (kraje rovnako veľké ako stred).
// Farba čiar = currentColor. Záhyby cesta sú orezané obrysom (clipPath),
// takže vždy presne dosadnú na okraj.
const CROISSANT_OUTLINE =
  'M4.8 34.8 A12.3 12.3 0 0 0 20.1 54.2 L21.8 53.1 L23.5 52 L25.2 51 L26.9 50.1 L28.5 49.3 L30.1 48.5 L31.7 47.8 L33.3 47.2 L34.8 46.7 L36.3 46.2 L37.8 45.7 L39.2 45.3 L40.6 45 L42 44.7 L43.4 44.5 L44.7 44.3 L46.1 44.2 L47.4 44.1 L48.7 44 L50 44 L51.3 44 L52.6 44.1 L53.9 44.2 L55.3 44.3 L56.6 44.5 L58 44.7 L59.4 45 L60.8 45.3 L62.2 45.7 L63.7 46.2 L65.2 46.7 L66.7 47.2 L68.3 47.8 L69.9 48.5 L71.5 49.3 L73.1 50.1 L74.8 51 L76.5 52 L78.2 53.1 L79.9 54.2 A12.3 12.3 0 0 0 95.2 34.8 L93.2 33.1 L91.1 31.4 L89.1 29.8 L86.9 28.2 L84.8 26.8 L82.7 25.4 L80.5 24.1 L78.3 22.9 L76 21.7 L73.8 20.7 L71.5 19.7 L69.2 18.9 L66.8 18.1 L64.5 17.4 L62.1 16.8 L59.7 16.4 L57.3 16 L54.9 15.7 L52.4 15.6 L50 15.5 L47.6 15.6 L45.1 15.7 L42.7 16 L40.3 16.4 L37.9 16.8 L35.5 17.4 L33.2 18.1 L30.8 18.9 L28.5 19.7 L26.2 20.7 L24 21.7 L21.7 22.9 L19.5 24.1 L17.3 25.4 L15.2 26.8 L13.1 28.2 L10.9 29.8 L8.9 31.4 L6.8 33.1 L4.8 34.8 Z'

const CROISSANT_FOLDS = [
  'M36.9 54.9 Q22.7 36.5 17.5 13.9',
  'M44.5 53.3 Q34.5 31.3 34.2 7',
  'M50 53 Q50 29 50 5',
  'M55.5 53.3 Q65.5 31.3 65.8 7',
  'M63.1 54.9 Q77.3 36.5 82.5 13.9',
]

export default function CroissantIcon({ size = 64, strokeWidth = 1.1, title, ...props }) {
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
