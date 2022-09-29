<script lang="ts">
  import { onMount } from "svelte";
  import CanvasHandler from "./classes/CanvasHandler";
  import GridFactory from "./classes/GridFactory";
  import PixelArray from "./classes/PixelArray"
  import StateHandler from "./classes/StateHandler";
  import { addEventListeners } from "./utils/EventListeners";
  import type { RGBAState, Size } from "./utils/Interfaces";
  import ImageCreator from "./classes/ImageCreator";

  export let canvasSize: Size;
  export let colourSelect: RGBAState;
  let state: StateHandler, pixels: PixelArray;
  
  onMount(() => {
    const canvasHandler = new CanvasHandler({
      size: canvasSize,
      id: 'canvas'
    })

    const baseSize = {cols: 32, rows: 32}

    state = new StateHandler(20)

    const grid = GridFactory.create({
      dimensions: baseSize,
      canvasSize: canvasHandler.getSize()
    })

    pixels = new PixelArray({
      size: baseSize,
      grid: grid
    })

    function initialDraw() {
      canvasHandler.clear()
      grid.drawLines(canvasHandler.getCtx())
    }

    function animate() {
      if (state.mouse.click) {
        if(colourSelect.dropper) {
          const newColour = pixels.getColourFromMouse(state.mouse)
          if (newColour !== null && newColour.a !== 0) {
            colourSelect.colour = newColour
            colourSelect.dropper = false
          }
          state.mouse.click = false
        } else {
          pixels.editPixels(state.mouse, colourSelect.colour)
        }
        
      }

      pixels.drawChanged(canvasHandler.getCtx())
      requestAnimationFrame(animate)
    }

    addEventListeners(state, pixels)
    initialDraw()
    animate()
  });

  export function createImage() {
    ImageCreator.fromPixels(pixels, state.scale)
  }
  
</script>

<canvas id="canvas"></canvas>

<style>
  canvas {
    margin: 0;
    padding: 0;
    display: flex;
  }
</style>

