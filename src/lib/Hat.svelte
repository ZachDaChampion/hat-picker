<script lang="ts">

let jumping = false;

function jump() {
  jumping = true;
  setTimeout(() => {
    jumping = false;
  }, 1000);
}

</script>

<img id="hat" src="/hat.png" alt="Hat" class="{jumping ? 'jumping' : ''}" on:click={jump} on:keydown={jump} />

<style>
  img {
    height: 100%;
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(2deg);
    }
    20% {
      transform: rotate(-2deg);
    }
    30% {
      transform: rotate(2deg);
    }
    40% {
      transform: rotate(-2deg);
    }
    50% {
      transform: rotate(2deg);
    }
    60% {
      transform: rotate(-2deg);
    }
    70% {
      transform: rotate(2deg);
    }
    80% {
      transform: rotate(-2deg);
    }
    90% {
      transform: rotate(2deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    5% {
      transform: translateY(50px) scale(.9);
    }
    15% {
      transform: translateY(75px) scale(.85);
    }
    20% {
      transform: translateY(-25%);
    }
    100% {
      transform: translateY(0);
    }
  }

  #hat:hover {
    animation: shake 1s infinite;
    cursor: pointer;
  }

  #hat.jumping {
    animation: jump 1s infinite;
  }


</style>