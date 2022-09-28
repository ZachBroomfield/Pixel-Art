import type PixelArray from './PixelArray'

export default class ImageCreator {
  static fromPixels(pixels: PixelArray, scale: number) {
    const buffer = this.#createBuffer(pixels, scale)
    const canvas = this.#createOffscreenCanvas(pixels.cols, pixels.rows, scale)
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    
    let img = ctx.createImageData(pixels.cols * scale, pixels.rows * scale)
    img.data.set(buffer)

    ctx.putImageData(img, 0, 0)

    const image = canvas.toDataURL()

    if (true) {
      let tempLink = document.createElement('a')
      tempLink.download = 'image.png'
      tempLink.href = image
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
    }
  }

  static #createBuffer(pixels: PixelArray, scale: number): Uint8Array {
    const buffer = new Uint8Array(pixels.getLength() * 4 * scale * scale)

    for (let col = 0; col < pixels.cols; col++) {
      for (let row = 0; row < pixels.rows; row++) {
        const colour = pixels.getColour(col, row)
        const start = {
          x: (col * scale),
          y: (row * scale)
        }

        for (let i = 0; i < scale; i++) {
          for (let j = 0; j < scale; j++) {
            const pos = (start.x + i + ((start.y + j) * pixels.cols * scale)) * 4
            if (colour !== null) {
              buffer[pos] = colour.r
              buffer[pos + 1] = colour.g
              buffer[pos + 2] = colour.b
              buffer[pos + 3] = colour.a
            }
          }
        }
      }
    }

    return buffer
  }

  static #createOffscreenCanvas(cols: number, rows: number, scale: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = cols * scale
    canvas.height = rows * scale
    return canvas
  }
}