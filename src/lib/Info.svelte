<script lang="ts">
  import { persistant_store, current_list } from "../store";
</script>

<div id="Info_container">
  <h1>Click hat to draw</h1>
</div>

<style>
  h1 {
    font-size: 5vh;
    margin: 0;
    opacity: 0.25;
  }

  #Info_container {
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
