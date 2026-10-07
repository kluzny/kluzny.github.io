export function calcSpawn(spawnedCount) {
  const digits = Math.floor(Math.log10(spawnedCount))
  return digits * 10 + 1
}

export function updateHighScore(score, highScore) {
  return score > highScore ? score : highScore
}
