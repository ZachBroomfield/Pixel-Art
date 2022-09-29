<script lang="ts">
  import PixelCanvas from "./lib/PixelCanvas.svelte";
  import UserInterface from "./lib/UserInterface.svelte";
  import type { RGBA } from "./lib/utils/Interfaces";

  let pixelCanvas: PixelCanvas;
  const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth * 0.75
  }

  let colourSelect: {colour: RGBA, dropper: boolean} = {
    colour: {
      r: 128,
      g: 128,
      b: 128,
      a: 255,
    },
    dropper: false
  }

  function createImage() {
    pixelCanvas.createImage()
  }

  addEventListener('keypress', () => {
    console.log(colourSelect)
  })
</script>


<div class="flex">
  <div class="flex-1">
    <PixelCanvas
      {canvasSize}
      bind:colourSelect={colourSelect}
      bind:this={pixelCanvas}
    />
  </div>

  <div class="flex-1 my-auto">
    <UserInterface
      bind:selection={colourSelect}
      on:createImage={createImage}
    />
  </div>
</div>

