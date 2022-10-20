<script lang="ts">
  import { onMount } from "svelte";
  import { current_list } from "../store";

  const hat_orig_width = 1450;
  const jump_duration = 1000;
  const card_anim_count = 10;
  const card_anim_width = 0.5;
  const card_anim_height = 0.5;

  let img_scale = 0;

  let canvas: HTMLCanvasElement;
  let hat: HTMLImageElement;
  let hat_container: HTMLDivElement;
  let window_width: number;
  let window_height: number;

  let hat_rect: DOMRect;
  let jumping = false;

  function jump() {
    jumping = true;
    setTimeout(() => {
      sprayAnimation();
    }, jump_duration * 0.2);
    setTimeout(() => {
      jumping = false;
    }, jump_duration);
  }

  function update_scale() {
    hat_rect = hat_container.getBoundingClientRect();
    img_scale = hat_rect.width / hat_orig_width;
  }

  interface CardAnimation {
    x: number;
    y: number;
    rotation: number;
    xv: number;
    yv: number;
    rotationv: number;
  }

  let cards: CardAnimation[] = [];
  function sprayAnimation() {
    cards = [];
    // const count = card_anim_count;
    const count = Math.min(card_anim_count, $current_list.in_hat.length);
    for (let i = 0; i < count; i++) {
      cards.push({
        x: canvas.width / 2,
        y: canvas.height,
        rotation: Math.random() * 360,
        xv: Math.random() * 2 - 1,
        yv: Math.random() * -2 - 1,
        rotationv: Math.random() * 2 - 1,
      });
    }
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");
    const card_img = new Image();
    card_img.src = "/card.png";
    card_img.onload = () => {
      console.log("card img loaded");
    };

    let frame = requestAnimationFrame(loop);
    let last_time = 0;

    function loop(t) {
      frame = requestAnimationFrame(loop);
      let time_delta = t - last_time;
      last_time = t;
      update_scale();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cards
      const card_width = card_img.naturalWidth * img_scale;
      const card_height = card_img.naturalHeight * img_scale;
      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];

        ctx.save();
        ctx.translate(card.x, card.y);
        ctx.rotate((card.rotation * Math.PI) / 180);
        ctx.drawImage(
          card_img,
          -card_width / 2,
          -card_height / 2,
          card_width,
          card_height
        );
        ctx.restore();

        card.x += card.xv * time_delta;
        card.y += card.yv * time_delta;
        card.rotation += card.rotationv * time_delta;

        // If card is off screen, remove it
        if (card.y < -card_height - card_width) {
          cards.splice(i, 1);
          i--;
        }
      }
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:window
  bind:innerWidth={window_width}
  bind:innerHeight={window_height}
/>

<canvas
  id="canvas"
  height={hat_rect?.top || 0}
  width={window_width}
  bind:this={canvas}
/>

<div id="hat_container" bind:this={hat_container}>
  <img
    bind:this={hat}
    id="hat"
    src="/hat.png"
    alt="Hat"
    class={jumping ? "jumping" : ""}
    on:click={jump}
    on:keydown={jump}
  />
</div>

<style>
  #canvas {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }

  #hat {
    z-index: 100;
    max-height: 33vh;
    max-width: 67vw;
  }

  #hat:hover {
    animation: shake 1s infinite;
    cursor: pointer;
  }

  #hat.jumping {
    animation: jump 1s infinite;
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
      transform: translateY(5%) scale(0.9);
    }
    15% {
      transform: translateY(8.5%) scale(0.85);
    }
    20% {
      transform: translateY(-25%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
