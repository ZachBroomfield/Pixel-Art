import Array2D from './Array2D'
import Pixel from './Pixel'
import type { Point, Dimensions, RGBAState, RGBA } from '../utils/Interfaces'
import type Grid from './Grid'

interface ConstructionParams {
  size: Dimensions
  grid: Grid
}

interface Colour {
  r: number
  g: number
  b: number
  a: number
}

export default class PixelArray {
  cols: number
  rows: number
  values: Array2D<Pixel>
  #grid: Grid
  #changed: Point[]
  #lastPixel: Point | null

  constructor(params: ConstructionParams) {
    this.cols = params.size.cols
    this.rows = params.size.rows
    this.values = new Array2D(params.size, new Pixel(0, 0, 0, 0))
    this.#grid = params.grid
    this.#changed = []
    this.#lastPixel = null

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.#changed.push({x: i, y: j})
      }
    }
  }

  getColour(x: number, y: number): Pixel {
    return this.values.get(x, y)
  }

  getColourFromMouse(point: Point): Pixel | null {
    const coord = this.#positionToCoord(point)

    if (coord !== null) {
      return this.getColour(coord.x - 1, coord.y - 1)
    } else {
      return null
    }
  }

  getLength() {
    return this.cols * this.rows
  }

  drawChanged(ctx: CanvasRenderingContext2D) {
    this.#changed.forEach(point => {
      const {topLeft, sideLength} = this.#grid.getDrawArea(point.x, point.y)
      let colour = this.getColour(point.x, point.y)
      if (colour.a === 0) {
        this.#drawTransparentPixel(ctx, topLeft, sideLength)
      } else {
        this.#drawPixel(
          ctx,
          topLeft,
          sideLength,
          `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`
        )
      }
    })

    this.#changed.length = 0
  }

  editPixels(point: Point, colourSelect: RGBAState) {
    const coord = this.#positionToCoord(point)

    let colour = colourSelect.colour

    if (coord !== null) {
      if (colourSelect.lock) {
        const oldColour = this.getColour(coord.x - 1, coord.y - 1)
        if (oldColour.a !== 0) {
          if (!(colour.a === 0) || !this.#sameColour(oldColour, colour)) {
            return
          }
        }
      }

      if (this.#lastPixel !== null) {
        if (coord.x === this.#lastPixel.x && coord.y === this.#lastPixel.y) {
          return
        }
      }
      if (colour.a === 0) {
        this.#changePixel(coord.x, coord.y, new Pixel(0, 0, 0, 0))
      } else {
        const newPixel = new Pixel(colour.r, colour.g, colour.b, colour.a)
        this.#changePixel(coord.x, coord.y, newPixel)
      }
    }

    this.#lastPixel = coord
  }

  resetLastPixel() {
    this.#lastPixel = null
  }

  #sameColour(one: RGBA, two: RGBA): boolean {
    return (
      one.r === two.r &&
      one.g === two.g &&
      one.b === two.b
    )
  }

  #changePixel(x: number, y: number, colour: Pixel) {
    this.values.set(x - 1, y - 1, colour)
    this.#changed.push({x: x - 1, y: y - 1})
  }

  #positionToCoord(point: Point) {
    return this.#grid.positionToCoord(point)
  }

  
  #drawTransparentPixel(ctx: CanvasRenderingContext2D, topLeft: Point, sideLength: number) {
    sideLength = sideLength / 2
    let x = topLeft.x
    let y = topLeft.y

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.#drawPixel(
          ctx,
          {x, y},
          sideLength,
          (i + j) % 2 === 0 ? '#D3D3D3' : '#FFFFFF'
        )

        x += sideLength
      }
      x = topLeft.x
      y += sideLength
    }
  }

  #drawPixel(ctx: CanvasRenderingContext2D, topLeft: Point, sideLength: number, colour: string) {
    ctx.beginPath()
    ctx.fillStyle = colour
    ctx.fillRect(
      topLeft.x,
      topLeft.y,
      sideLength,
      sideLength
    )
    ctx.stroke()
  }
}