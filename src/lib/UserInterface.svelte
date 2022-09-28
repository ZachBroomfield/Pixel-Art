<script lang="ts">
  import ColourPicker from "./ColourPicker.svelte";
  // import ToggleButton from "./ToggleButton.svelte";
  // import CreateImage from "./CreateImage.svelte";
  import Button from "./Button.svelte";
  import ColourShow from "./ColourShow.svelte";
  import type { RGBA } from "./utils/Interfaces";

  export let selection: RGBA = {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }

  $: eraserActive = selection.a === 0

  function handleEraser() {
    if (selection.a === 0) {
      selection.a = 255
    } else {
      selection.a = 0
    }
  }
</script>

<div class="max-w-xs">

  <div class="flex flex-row">
    <div class="basis-3/4">
      <ColourPicker bind:value={selection.r} name={"R"} />
      <ColourPicker bind:value={selection.g} name={"G"} />
      <ColourPicker bind:value={selection.b} name={"B"} />
    </div>
    <div class="basis-1/4 my-auto">
      <ColourShow colour={selection} />
    </div>
  </div>

  <div class="my-4 text-center">
    <Button on:eraser={handleEraser} messageName={"eraser"} text={"Eraser"} bind:active={eraserActive} />
  </div>

  <div class="my-4 text-center">
    <Button on:createImage messageName={"createImage"} text={"Create Image"} active={false} />
  </div>
  
</div>

<style>
  * {
    user-select: none;
    -moz-user-select: none;
  }
  
</style>