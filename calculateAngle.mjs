export function calculateAngle(a, b, c) {
  let angleA = Math.atan2(
    a.y - b.y,
      a.x - b.x
  )
  let angleB = Math.atan2(
    c.y - b.y,
      c.x - b.x
  )
  if (angleB < angleA) {
    const tempAngle = angleA
    angleA = angleB
    angleB = tempAngle
  }
  return (angleA + (angleB - angleA) / 2 + Math.PI) % (2 * Math.PI)
}
