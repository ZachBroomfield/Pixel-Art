import type GridLine from './GridLine'
import type Vector2D from './Vector2D'
import type { Point, Dimensions } from '../utils/Interfaces'

interface ConstructionParams {
  dimensions: Dimensions
  topLeft: Vector2D
  gridLines: GridLine[]
  spacing: number
  coordToPosition: (arg: Point) => Point
  positionToCoord: (arg: Point) => Point | null
}

export default class Grid {
  #dimensions: Dimensions
  #topLeft: Vector2D
  #gridLines: GridLine[]
  #spacing: number
  coordToPosition: (arg: Point) => Point
  positionToCoord: (arg: Point) => Point | null
  // #changed: Point[]

  constructor(params: ConstructionParams) {
    this.#dimensions = params.dimensions
    this.#topLeft = params.topLeft
    this.#gridLines = params.gridLines
    this.#spacing = params.spacing
    this.coordToPosition = params.coordToPosition
    this.positionToCoord = params.positionToCoord

    // this.#changed = []
    // this.#setStartAndEnd()
  }

  drawLines(ctx: CanvasRenderingContext2D) {
    this.#drawGridLines(ctx)
  }

  // get(x: number, y: number): Box {
  //   return this.#boxes.get(x, y)
  // }

  // set(x: number, y: number, value: number) {
  //   this.#boxes.set(x, y, value)
  //   this.#changed.push({x, y})
  // }

  // drawChanged(ctx: CanvasRenderingContext2D) {
  //   this.#drawChangedBoxes(ctx)
  // }

  // editGrid(state: State) {
  //   this.#editGrid(state)
  // }

  // randomiseBarriers(weighting: number) {
  //   this.#randomiseBarriers(weighting)
  // }

  // clearPath() {
  //   this.#clearPath()
  // }

  // clearAll() {
  //   this.#clearAll()
  // }

  // getStart(): Vector2D {
  //   return this.#getStart()
  // }

  getDimensions(): Dimensions {
    return this.#dimensions
  }

  getDrawArea(x: number, y: number): {topLeft: Point, sideLength: number} {
    return {
      topLeft: {
        x: this.#topLeft.x + (x * this.#spacing) + 1,
        y: this.#topLeft.y + (y * this.#spacing) + 1
      },
      sideLength:this.#spacing - 2
    }
  }

  // resetChanged() {
  //   this.#changed.length = 0
  // }

  // PRIVATE

  #drawGridLines(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = 'gray'
    ctx.lineWidth = 1
    this.#gridLines.forEach(line => {
      const segment = line.get()
      ctx.beginPath()
      ctx.moveTo(segment.start.x, segment.start.y)
      ctx.lineTo(segment.end.x, segment.end.y)
      ctx.stroke()
    })
  }

  // #getEnd(): Vector2D {
  //   for (let i = 1; i <= this.#dimensions.cols; i++) {
  //     for (let j = 1; j <= this.#dimensions.rows; j++) {
  //       if (this.get(i, j).getType() === BoxTypes.End) {
  //         return new Vector2D(i, j)
  //       }
  //     }
  //   }

  //   throw "No End Position"
  // }

  // #setStartAndEnd() {
  //   const {cols, rows} = this.#dimensions

  //   const startX = Math.min(Math.ceil(cols * 0.1), 3)
  //   const startY = Math.ceil(rows / 2)

  //   this.set(startX, startY, BoxTypes.Start)

  //   const endX = cols + 1 - Math.min(Math.ceil(cols * 0.1), 3)
  //   const endY = Math.ceil(rows / 2)

  //   this.set(endX, endY, BoxTypes.End)
  // }

  // #removeOldStart() {
  //   const oldStart = this.getStart()
  //   this.set(oldStart.x, oldStart.y, BoxTypes.Blank)
  // }

  // #removeOldEnd() {
  //   const oldEnd = this.#getEnd()
  //   this.set(oldEnd.x, oldEnd.y, BoxTypes.Blank)
  // }

  // #drawChangedBoxes(ctx: CanvasRenderingContext2D) {
  //   this.#changed.forEach(point => {
  //     const box = this.#boxes.get(point.x, point.y)
  //     box.draw(
  //       ctx,
  //       {
  //         x: this.#topLeft.x + ((point.x - 1) * this.#spacing) + 1,
  //         y: this.#topLeft.y + ((point.y - 1) * this.#spacing) + 1
  //       },
  //         this.#spacing - 2
  //     )
  //   })

  //   this.#changed.length = 0
  // }

  // #editGrid(state: State) {
  //   const coord = this.positionToCoord({x: state.mouse.x, y: state.mouse.y})
  //   if (coord !== null) {
  //     const boxType = this.get(coord.x, coord.y).getType()

  //     if (boxType !== state.drawType && boxType !== 2 && boxType !== 3) {
  //       if (state.drawType === BoxTypes.Start) {
  //         this.#removeOldStart()
  //       }
        
  //       if (state.drawType === BoxTypes.End) {
  //         this.#removeOldEnd()
  //       }

  //       this.set(coord.x, coord.y, state.drawType)
  //     }
  //   }
  // }

  // #randomiseBarriers(weighting: number) {
  //   this.clearAll()
    
  //   for (let i = 1; i <= this.#dimensions.cols; i++) {
  //     for (let j = 1; j <= this.#dimensions.rows; j++) {
  //       const type = this.get(i, j).getType()
  //       if (type === BoxTypes.Start || type === BoxTypes.End) continue

  //       const rand = Math.random()
  //       if (rand < weighting) {
  //         this.set(i, j, BoxTypes.Blank)
  //       } else {
  //         this.set(i, j, BoxTypes.Barrier)
  //       }
  //     }
  //   }
  // }

  // #clearPath() {
  //   for (let i = 1; i <= this.#dimensions.cols; i++) {
  //     for (let j = 1; j <= this.#dimensions.rows; j++) {
  //       const type = this.get(i, j).getType()
  //       if (type === BoxTypes.Path || type === BoxTypes.Success) {
  //         this.set(i, j, BoxTypes.Blank)
  //       }
  //     }
  //   }
  // }

  // #clearAll() {
  //   for (let i = 1; i <= this.#dimensions.cols; i++) {
  //     for (let j = 1; j <= this.#dimensions.rows; j++) {
  //       const type = this.get(i, j).getType()
  //       if (
  //         type === BoxTypes.Barrier ||
  //         type === BoxTypes.Path ||
  //         type === BoxTypes.Success
  //       ) {
  //         this.set(i, j, BoxTypes.Blank)
  //       }
  //     }
  //   }
  // }

  // #getStart(): Vector2D {
  //   for (let i = 1; i <= this.#dimensions.cols; i++) {
  //     for (let j = 1; j <= this.#dimensions.rows; j++) {
  //       if (this.get(i, j).getType() === BoxTypes.Start) {
  //         return new Vector2D(i, j)
  //       }
  //     }
  //   }

  //   throw "No Start Position"
  // }
}