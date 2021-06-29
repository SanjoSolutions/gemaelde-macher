function create(chooseColor, options = {}) {
  const image = createImage(chooseColor, options)
  document.body.appendChild(image)
}

function createImage(chooseColor, options = {}) {
  options = {
    rectangleWidth: 1,
    rectangleHeight: 1,
    width: 256,
    height: 256,
    ...options
  }
  const canvas = document.createElement('canvas')
  canvas.width = options.width
  canvas.height = options.height
  const context = canvas.getContext('2d')
  for (let y = 0; y < canvas.height; y += options.rectangleHeight) {
    for (let x = 0; x < canvas.width; x += options.rectangleWidth) {
      context.fillStyle = chooseColor(canvas, context, x, y, options)
      context.fillRect(x, y, options.rectangleWidth, options.rectangleHeight)
    }
  }
  return canvas
}

function chooseRandomColor() {
  return randomColor()
}

function chooseColor2(canvas, context, x, y) {
  return chooseColorWithCloseHue(canvas, context, x, y, 5)
}

function chooseColor3(canvas, context, x, y) {
  return chooseColorWithCloseHue(canvas, context, x, y, 1)
}

function chooseColorWithCloseHue(canvas, context, x, y, maxHueDelta) {
  if (x === 0 && y === 0) {
    return randomColor()
  } else {
    const [r, g, b] = retrievePreviousColor(x, y, canvas, context)
    const hue = rgb2hue(r, g, b)
    let minHue = hue - maxHueDelta
    if (minHue < 0) {
      minHue = 360 - minHue
    }
    const maxHue = (hue + 5) % 360
    return `hsl(${randomInteger(minHue, maxHue)}, ${randomInteger(0, 100)}%, ${randomInteger(0, 100)}%)`
  }
}

function chooseColor4(canvas, context, x, y, options) {
  let result
  if (y < options.rectangleHeight) {
    result = randomColor()
  } else {
    if (x < options.rectangleWidth) {
      result = retrieveColor(options.rectangleWidth, 0, canvas, context)
    } else {
      result = retrieveColor(0, 0, canvas, context)
    }
    result = `rgb(${result[0]}, ${result[1]}, ${result[2]})`
  }
  return result
}

function retrievePreviousColor(x, y, canvas, context) {
  const previousCoordinates = determinePreviousCoordinates(x, y, canvas)
  return retrieveColor(previousCoordinates.x, previousCoordinates.y, canvas, context)
}

function retrieveColor(x, y, canvas, context) {
  const imageData = context.getImageData(x, y, 1, 1)
  const color = imageData.data
  return color
}

function determinePreviousCoordinates(x, y, canvas) {
  if (x >= 1) {
    return {x: x - 1, y}
  } else {
    return {x: canvas.width - 1, y: y - 1}
  }
}

function randomColor() {
  return `#${randomInteger(0, 0xFFFFFF).toString(16)}`
}

function randomInteger(from, to) {
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor(from + Math.random() * (to - from))
}

function createMultiple(amount, chooseColor, options) {
  for (let i = 1; i <= amount; i++) {
    create(chooseColor, options)
  }
}

/**
 * Source: https://stackoverflow.com/a/39147465/759971
 * License: CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/)
 */
function rgb2hue(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var c   = max - min;
  var hue;
  if (c == 0) {
    hue = 0;
  } else {
    switch(max) {
      case r:
        var segment = (g - b) / c;
        var shift   = 0 / 60;       // R° / (360° / hex sides)
        if (segment < 0) {          // hue > 180, full rotation
          shift = 360 / 60;         // R° / (360° / hex sides)
        }
        hue = segment + shift;
        break;
      case g:
        var segment = (b - r) / c;
        var shift   = 120 / 60;     // G° / (360° / hex sides)
        hue = segment + shift;
        break;
      case b:
        var segment = (r - g) / c;
        var shift   = 240 / 60;     // B° / (360° / hex sides)
        hue = segment + shift;
        break;
    }
  }
  return hue * 60; // hue is in [0,6], scale it up
}
