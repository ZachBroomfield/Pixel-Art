<script lang="ts">
  import { onMount } from "svelte";
  import CanvasHandler from "./classes/CanvasHandler";
  import GridFactory from "./classes/GridFactory";
  import PixelArray from "./classes/PixelArray"
  import StateHandler from "./classes/StateHandler";
  import { addEventListeners } from "./utils/EventListeners";
  import type { RGBA, Size } from "./utils/Interfaces";
  import ImageCreator from "./classes/ImageCreator";

  export let canvasSize: Size;
  export let colourSelect: RGBA;
  let state: StateHandler, pixels: PixelArray;
  
  onMount(() => {
    const canvasHandler = new CanvasHandler({
      size: canvasSize,
      id: 'canvas'
    })

    const baseSize = {cols: 40, rows: 40}

    state = new StateHandler
    const colour = colourSelect

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
        pixels.editPixels(state.mouse, colour)
      }

      pixels.drawChanged(canvasHandler.getCtx())
      requestAnimationFrame(animate)
    }

    initialDraw()
    addEventListeners(state, pixels)
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

