// Nájde najvhodnejšiu kombináciu voľných stolov pre daný počet hostí:
// najmenej prázdnych miest, pri zhode čo najmenej stolov. Vráti pole stolov alebo null.
export function allocateTables(freeTables, guests) {
  let best = null
  const n = freeTables.length
  for (let mask = 1; mask < 1 << n; mask++) {
    const combo = freeTables.filter((_, i) => mask & (1 << i))
    const seats = combo.reduce((s, t) => s + t.seats, 0)
    if (seats < guests) continue
    const waste = seats - guests
    if (
      !best ||
      waste < best.waste ||
      (waste === best.waste && combo.length < best.combo.length)
    ) {
      best = { combo, waste }
    }
  }
  return best ? best.combo : null
}
