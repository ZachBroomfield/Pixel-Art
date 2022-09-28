import ImageCreator from "../classes/ImageCreator"
import type PixelArray from "../classes/PixelArray"
import type StateHandler from "../classes/StateHandler"

export function addEventListeners(state: StateHandler, pixels: PixelArray) {
  addEventListener('mousedown', e => {
    state.updateMousePosition(e)
    if (e.button === 0) {
      state.mouse.click = true
    }
  })

  addEventListener('mouseup', e => {
    state.updateMousePosition(e)
    if (e.button === 0) {
      state.mouse.click = false
      pixels.resetLastPixel()
    }
  })

  addEventListener('mousemove', e => {
    state.updateMousePosition(e)
  })
}