<script lang="ts">
  import { persistant_store, current_list, current_list_idx } from "../store";

  function set_draw_count(count: number) {
    persistant_store.update((store) => {
      store.lists[$current_list_idx].count_per_draw = count;
      return store;
    });
  }
</script>

<div id="DrawCountSelector_container">
  <h1>Draw this many cards:</h1>
  <div id="DrawCountSelector_btn_row">
    {#each [1, 2, 3, 4, 5] as i}
      <button
        class="DrawCountSelector_single_num_btn {$current_list.count_per_draw === i
          ? 'DrawCountSelector_selected'
          : ''}"
        on:click={() => set_draw_count(i)}>{i}</button
      >
    {/each}
  </div>
</div>

<style>
  #DrawCountSelector_container {
    z-index: 20;
    position: absolute;
    top: 67%;
    left: 0;
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #DrawCountSelector_btn_row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .DrawCountSelector_single_num_btn {
    font-size: 3em;
    width: 1.5em;
    height: 1.5em;
    margin: 16px;
    border-radius: 999px;
    border: 0.1em solid #404040;
    transition: 250ms;
  }

  .DrawCountSelector_single_num_btn:hover:not(.DrawCountSelector_selected) {
    background-color: #e0e0e0;
  }

  .DrawCountSelector_selected {
    background-color: #404040;
    color: white;
  }
</style>
