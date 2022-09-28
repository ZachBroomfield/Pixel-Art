<script lang="ts">
  import PixelCanvas from "./lib/PixelCanvas.svelte";
  import UserInterface from "./lib/UserInterface.svelte";
  import type { RGBA } from "./lib/utils/Interfaces";

  let pixelCanvas;

  const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth * 0.8
  }

  let colourSelect: RGBA = {
    r: 128,
    g: 128,
    b: 128,
    a: 255
  }

  function createImage() {
    pixelCanvas.createImage()
  }
</script>


<div class="flex flex-row">
  <div class="basis-4/5">
    <PixelCanvas {canvasSize} {colourSelect} bind:this={pixelCanvas} />
  </div>

  <div class="basis-1/5 my-auto">
    <UserInterface bind:selection={colourSelect} on:createImage={createImage} />
  </div>
</div>

