<script lang="ts">
  import { scale } from "svelte/transition";
  import {
    card_grid_visible,
    drawn_cards,
    current_list,
    persistant_store,
    current_list_idx,
  } from "../store";

  function select_card(hat_index) {
    persistant_store.update((store) => {
      const card = store.lists[$current_list_idx].in_hat[hat_index];
      store.lists[$current_list_idx].drawn.push({
        name: card.name,
        uuid: card.uuid,
        date: new Date(),
      });
      store.lists[$current_list_idx].in_hat.splice(hat_index, 1);
      return store;
    });
    card_grid_visible.set(false);
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key == "Escape") {
      card_grid_visible.set(false);
    }
  }}
/>

{#if $card_grid_visible}
  <div id="CardGrid_bg" transition:scale={{ start: 1.01 }}>
    <button
      id="CardGrid_close_btn"
      type="button"
      on:click={() => {
        console.log("close");
        card_grid_visible.set(false);
      }}
    >
      <img id="CardGrid_close_btn_img" src="/close_icon.svg" alt="Close icon" />
    </button>
    <div id="CardGrid_content">
      <div class="CardGrid_content_row">
        {#each $drawn_cards as card, i (i)}
          {#if i < $drawn_cards.length / 2 || $drawn_cards.length <= 2}
            <div
              class="CardGrid_card"
              on:click={() => {
                select_card(i);
              }}
              on:keydown={(e) => {
                if (parseInt(e.key) === i) select_card(i);
              }}
            >
              <div class="CardGrid_card_name">
                {$current_list.in_hat[card].name}
              </div>
            </div>
          {/if}
        {/each}
      </div>
      {#if $drawn_cards.length > 2}
        <div class="CardGrid_content_row">
          {#each $drawn_cards as card, i (i)}
            {#if i >= $drawn_cards.length / 2}
              <div
                class="CardGrid_card"
                on:click={() => {
                  select_card(i);
                }}
                on:keydown={(e) => {
                  if (parseInt(e.key) === i) select_card(i);
                }}
              >
                <div class="CardGrid_card_name">
                  {$current_list.in_hat[card].name}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  #CardGrid_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffffe6;
    z-index: 1000;
    transition: 250ms;
  }

  #CardGrid_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .CardGrid_content_row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  #CardGrid_close_btn {
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 1.5em;
    align-items: center;
    transition: 250ms;
  }

  .CardGrid_card {
    margin: 32px;
    background-color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    padding: 32px;
    justify-self: center;
    align-self: center;
    height: calc(33vh - 64px);
    width: 20vw;
    transition: 250ms;
  }

  .CardGrid_card:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .CardGrid_card_name {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 16px;
    text-align: center;
  }
</style>
