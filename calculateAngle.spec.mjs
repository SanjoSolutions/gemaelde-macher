import { calculateAngle } from "./calculateAngle.mjs";

{
  const a = {x: -1, y: 0}
  const b = {x: 0, y: 1}
  const c = {x: 1, y: 0}
  console.log(calculateAngle(a, b, c) === 0.5 * Math.PI)
}

{
  const a = {x: 1, y: 0}
  const b = {x: 0, y: 1}
  const c = {x: -1, y: 0}
  console.log(calculateAngle(a, b, c) === 0.5 * Math.PI)
}

{
  const a = {x: 1, y: -1}
  const b = {x: 0, y: 0}
  const c = {x: 1, y: 1}
  console.log(calculateAngle(a, b, c) === Math.PI)
}

{
  const a = {x: 1, y: 1}
  const b = {x: 0, y: 0}
  const c = {x: 1, y: -1}
  console.log(calculateAngle(a, b, c) === Math.PI)
}
