<script lang="ts">
  export let value: number
  export let name: string
</script>

<div>
  <label>
      <span class="flex items-center w-0">
        <span class="text-xl ml-2">
          {name}:
        </span>

        <input type=range bind:value={value} min=0 max=255>
        <input type=number bind:value={value} min=0 max=255 class="inputNumber">
      </span>
  </label>
</div>

<style>
  input {
    margin: 6px;
  }

  .inputNumber {
    width: 45px;
  }

</style>