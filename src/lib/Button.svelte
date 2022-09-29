<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let messageName: string;
  export let text: string;
  export let active: boolean;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch(messageName)
  }
</script>

<button on:click={handleClick} class="btn btn-lg" class:btn-primary="{active}">
  {text}
</button>