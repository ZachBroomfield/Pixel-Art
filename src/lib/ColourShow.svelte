<script lang="ts">
  import type { RGBA } from "./utils/Interfaces";

  export let colour: RGBA;
</script>

<div class="parent w-14 h-14 rounded">
  <img class="child rounded-lg" src="src/assets/transparent2.png" alt="transparent">
  <div class="child rounded-lg"
    style="{`background-color: rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`}">
  </div>
</div>

<style>
  .parent {
    position: relative;
  }

  .child {
    position: absolute;
    height: 100%;
    width: 100%
  }
</style>
