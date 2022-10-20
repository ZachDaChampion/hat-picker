<script lang="ts">
  import { persistant_store, current_list_idx } from "../store";

  let dropdown: HTMLSelectElement;
  let selected = 0;

  console.log($persistant_store);
</script>

<div id="top-bar">
  <select
    id="dropdown"
    bind:value={selected}
    bind:this={dropdown}
    title="Hats"
    on:change={() => {
      if (selected == -1) {
        // TODO: Add new hat
      } else $current_list_idx = selected;
      dropdown.blur();
    }}
  >
    {#each $persistant_store.lists as store, i}
      <option value={i}>{store.name}</option>
    {/each}
    <option value={-1}>Create New Hat</option>
  </select>
  <button id="add_btn" type="button"
    ><img id="add_btn_img" src="/add_icon.svg" alt="Add icon" /><span
      >Add cards</span
    ></button
  >
</div>

<style>
  #dropdown {
    font-size: 1.5em;
    direction: rtl;
    transition: 250ms;
  }

  #dropdown option {
    direction: ltr;
  }

  #add_btn {
    font-size: 1.5em;
    display: inline-flex;
    align-items: center;
    transition: 250ms;
  }

  #add_btn:hover,
  #dropdown:hover,
  #dropdown:focus {
    outline: none;
    transform: scale(1.1);
  }

  #add_btn_img {
    margin-right: 8px;
    width: 1.5em;
    height: 1.5em;
    transform: translateY(-0.035em);
  }

  #top-bar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    padding: 32px;
    top: 0;
    left: 0;
    width: calc(100% - 64px);
    z-index: 1;
  }
</style>
