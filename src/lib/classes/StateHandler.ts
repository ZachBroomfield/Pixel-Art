export default class StateHandler {
  mouse: {
    x: number
    y: number
    click: boolean
  }
  scale: number

  constructor(scale: number) {
    this.mouse = {
      x: 0,
      y: 0,
      click: false
    }
    this.scale = scale

  }

  updateMousePosition(e: MouseEvent) {
    this.mouse.x = e.clientX + document.documentElement.scrollLeft
    this.mouse.y = e.clientY + document.documentElement.scrollTop
  }
}