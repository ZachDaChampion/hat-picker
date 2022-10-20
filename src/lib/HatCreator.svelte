<script lang="ts">
  import { scale } from "svelte/transition";
  import {
    hat_creator_visible,
    current_list,
    persistant_store,
    current_list_idx,
  } from "../store";

  if ($persistant_store.lists.length == 0) {
    persistant_store.update((store) => {
      store.lists.push({
        name: "New hat",
        in_hat: [],
        drawn: [],
        count_per_draw: 1,
      });
      return store;
    });
    $hat_creator_visible = true;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key == "Escape") {
      hat_creator_visible.set(false);
    }
  }}
/>

{#if $hat_creator_visible}
  <div id="HatCreator_bg" transition:scale={{ start: 1.01 }}>
    <button
      id="HatCreator_close_btn"
      type="button"
      on:click={() => {
        console.log("close");
        hat_creator_visible.set(false);
      }}
    >
      <img
        id="HatCreator_close_btn_img"
        src="/close_icon.svg"
        alt="Close icon"
      />
    </button>
    <div id="HatCreator_content">
      <input
        type="text"
        id="HatCreator_name_input"
        placeholder="Hat name"
        bind:value={$persistant_store.lists[$current_list_idx].name}
      />
      {#each $current_list.in_hat as i}
        <div class="HatCreator_card">
          <p>card</p>
        </div>
      {/each}
      <button id="HatCreator_add_card_btn">
        <h2>Add card</h2>
        <img
          id="HatCreator_add_card_btn_img"
          src="/add_icon.svg"
          alt="Add icon"
        />
      </button>
    </div>
  </div>
{/if}

<style>
  #HatCreator_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.9;
    z-index: 1000;
    transition: 250ms;
  }

  #HatCreator_content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    align-content: center;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #HatCreator_name_input {
    font-size: 3.5em;
    margin-top: 15vh;
    margin-bottom: 64px;
    background-color: transparent;
    border: none;
    outline: none;
    color: #404040;
    width: 100%;
    text-align: center;
  }

  #HatCreator_name_input::placeholder {
    color: #b0b0b0;
  }

  #HatCreator_close_btn {
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 1.5em;
    align-items: center;
    transition: 250ms;
  }

  #HatCreator_add_card_btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    transition: 250ms;
  }

  #HatCreator_close_btn:hover,
  #HatCreator_add_card_btn:hover {
    transform: scale(1.1);
  }
</style>
