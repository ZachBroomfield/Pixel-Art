<script lang="ts">
  import ColourPicker from "./ColourPicker.svelte";
  import Button from "./Button.svelte";
  import ColourShow from "./ColourShow.svelte";
  import type { RGBAState } from "./utils/Interfaces";

  export let selection: RGBAState


  let eraserActive = false

  function handleEraser() {
    if (selection.colour.a === 0) {
      selection.colour.a = 255
      eraserActive = false
    } else {
      selection.colour.a = 0
      eraserActive = true
    }
    selection.dropper = false
  }

  function handleSelect() {
    selection.dropper = !selection.dropper
    
    if (eraserActive) {
      eraserActive = false
      selection.colour.a = 255
    }
  }
</script>

<div class="min-w-min max-w-min">
  
  <div class="">
    <ColourPicker bind:value={selection.colour.r} name={"R"} />
    <ColourPicker bind:value={selection.colour.g} name={"G"} />
    <ColourPicker bind:value={selection.colour.b} name={"B"} />
  </div>

  <div class="">
    <ColourShow colour={selection.colour} />
  </div>
  

  <div class="my-4 ml-4 btn-group btn-group-vertical">
    <Button on:eraser={handleEraser} messageName={"eraser"} text={"Eraser"} bind:active={eraserActive} />
    <Button on:select={handleSelect} messageName={"select"} text={"Dropper"} bind:active={selection.dropper} />
    <Button on:createImage messageName={"createImage"} text={"Download"} active={false} />
  </div>
  
</div>

<style>
  * {
    user-select: none;
    -moz-user-select: none;
  }
  
</style>