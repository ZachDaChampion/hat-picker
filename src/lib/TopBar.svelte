<script lang="ts">
  import {
    hat_creator_visible,
    persistant_store,
    current_list_idx,
  } from "../store";

  let dropdown: HTMLSelectElement;
  let selected = 0;

  console.log($persistant_store);
</script>

<div id="TopBar_top-bar">
  <select
    id="TopBar_dropdown"
    bind:value={selected}
    bind:this={dropdown}
    title="Hats"
    on:change={() => {
      current_list_idx.set(selected);
      dropdown.blur();
      if (selected == $persistant_store.lists.length) {
        persistant_store.update((store) => {
          store.lists.push({
            name: "New hat",
            in_hat: [],
            drawn: [],
            count_per_draw: 1,
          });
          return store;
        });
        hat_creator_visible.set(true);
        console.log($hat_creator_visible);
      }
    }}
  >
    {#each $persistant_store.lists as store, i}
      <option value={i}>{store.name}</option>
    {/each}
    <option value={$persistant_store.lists.length}>Create New Hat</option>
  </select>
  <button
    id="TopBar_add_btn"
    type="button"
    on:click={() => hat_creator_visible.set(true)}
    ><img id="TopBar_add_btn_img" src="/add_icon.svg" alt="Add icon" /><span
      >Add cards</span
    ></button
  >
</div>

<style>
  #TopBar_dropdown {
    font-size: 1.5em;
    direction: rtl;
    transition: 250ms;
  }

  #TopBar_dropdown option {
    direction: ltr;
  }

  #TopBar_add_btn {
    font-size: 1.5em;
    display: inline-flex;
    align-items: center;
    transition: 250ms;
  }

  #TopBar_add_btn:hover,
  #TopBar_dropdown:hover,
  #TopBar_dropdown:focus {
    outline: none;
    transform: scale(1.1);
  }

  #TopBar_add_btn_img {
    margin-right: 8px;
    width: 1.5em;
    height: 1.5em;
    transform: translateY(-0.035em);
  }

  #TopBar_top-bar {
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
