<script lang="ts">
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import {
    hat_creator_visible,
    persistant_store,
    current_list_idx,
  } from "../store";

  import { v4 as uuidv4 } from "uuid";

  let content;

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

  function add_card() {
    persistant_store.update((store) => {
      store.lists[$current_list_idx].in_hat.push({ name: "", uuid: uuidv4() });
      return store;
    });
    setTimeout(() => {
      scroll_to_bottom(content);
    }, 250);
  }

  function focus_on_me(el) {
    el.focus();
  }

  const scroll_to_bottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };
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
        src="close_icon.svg"
        alt="Close icon"
      />
    </button>
    <div id="HatCreator_content" bind:this={content}>
      <input
        type="text"
        id="HatCreator_name_input"
        placeholder="Hat name"
        bind:value={$persistant_store.lists[$current_list_idx].name}
      />
      {#each $persistant_store.lists[$current_list_idx].in_hat as card, i (card.uuid)}
        <div
          class="HatCreator_card"
          in:scale={{}}
          animate:flip={{ duration: 250 }}
        >
          <div
            class="HatCreator_card_input"
            contenteditable="true"
            placeholder="Create New Card"
            use:focus_on_me
            bind:innerHTML={card.name}
            on:keydown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                add_card();
              }
            }}
          />
          <button
            class="HatCreator_card_delete_btn"
            type="button"
            on:click={() => {
              persistant_store.update((store) => {
                store.lists[$current_list_idx].in_hat.splice(i, 1);
                return store;
              });
            }}
          >
            <img
              class="HatCreator_card_delete_btn_img"
              src="close_icon.svg"
              alt="Close icon"
            />
          </button>
        </div>
      {/each}
      <button id="HatCreator_add_card_btn" on:click={add_card}>
        <h2>Add card</h2>
        <img
          id="HatCreator_add_card_btn_img"
          src="add_icon.svg"
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
    background-color: #ffffffe6;
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
    margin-bottom: 64px;
  }

  .HatCreator_card {
    width: calc(90% - 64px);
    max-width: 650px;
    margin: 0 auto;
    margin-bottom: 32px;
    background-color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
    padding: 32px;
    /* transition: 250ms; */
  }

  .HatCreator_card_input {
    font-size: 1.5em;
    margin: 0;
    background-color: transparent;
    border: none;
    outline: none;
    color: #404040;
    width: 100%;
    height: fit-content;
    text-align: center;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    box-shadow: none;
    resize: none;
    padding: none;
  }

  .HatCreator_card_input[contenteditable="true"]:empty:before {
    content: attr(placeholder);
    opacity: 0.6;
  }

  .HatCreator_card_input::placeholder {
    color: #b0b0b0;
  }

  .HatCreator_card_delete_btn {
    margin-left: 32px;
    align-items: center;
    transition: 250ms;
  }

  #HatCreator_close_btn:hover,
  #HatCreator_add_card_btn:hover,
  .HatCreator_card_delete_btn:hover {
    transform: scale(1.1);
  }
</style>
