<script lang="ts">
  import { onMount } from "svelte";

  type Layer = { speed: number; bubbles: Bubble[] };
  type Bubble = {
    colour: "blue" | "green";
    x: number;
    y: number;
    rotation: number;
  };

  const wrap = 3600;
  const layers: Layer[] = [
    {
      speed: 0.96,
      bubbles: [
        { colour: "green", x: 0.02, y: 0.1, rotation: 15 },
        { colour: "blue", x: 0.91, y: 0.3, rotation: 120 },
        { colour: "blue", x: 0.06, y: 0.6, rotation: 270 },
        { colour: "green", x: 0.96, y: 0.9, rotation: 60 },
      ],
    },
    {
      speed: 1.2,
      bubbles: [
        { colour: "blue", x: 0.09, y: 0.35, rotation: 300 },
        { colour: "green", x: 0.92, y: 0.85, rotation: 200 },
      ],
    },
    {
      speed: 2.4,
      bubbles: [
        { colour: "blue", x: 0.99, y: 0.1, rotation: 350 },
        { colour: "green", x: 0.03, y: 0.6, rotation: 70 },
        { colour: "green", x: 0.92, y: 0.9, rotation: 140 },
      ],
    },
  ];

  let scroll: number;
  let ready = false;

  onMount(() => {
    ready = true;
  });

  const getCSSVars = (vars: Record<string, string | number>): string =>
    Object.entries(vars)
      .map(([name, value]) => `--${name}:${value}`)
      .join(";");
</script>

<svelte:window bind:scrollY={scroll} />

<aside class:ready>
  {#each layers as { speed, bubbles }}
    <div
      class="layer"
      style={getCSSVars({
        speed,
        scroll: `${-(scroll % (wrap / speed))}px`,
        wrap: `${wrap}px`,
        index: speed > 1 ? 1 : -1,
      })}
    >
      {#each [0, 1] as offset}
        {#each bubbles as bubble}
          <div
            class={`bubble ${bubble.colour}`}
            style={getCSSVars({
              left: `${bubble.x * 100}vw`,
              top: `${(bubble.y + offset) * 50}%`,
              rotation: `${bubble.rotation}deg`,
            })}
          />
        {/each}
      {/each}
    </div>
  {/each}
</aside>

<style>
  aside {
    display: none;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    aside {
      display: block;
      position: absolute;
      inset: 0;
      overflow: hidden;
      width: 100vw;
      left: min(calc((1300px - 100vw) / 2), 0px);
    }

    .layer {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      height: calc(var(--wrap) * 2);
      transform: translate3d(0, calc(var(--scroll) * var(--speed)), 0);
      opacity: 0;
      z-index: var(--index);
    }

    .ready .layer {
      transition: opacity 300ms;
      opacity: calc(var(--index) * 0.5 + 1);
    }

    .bubble {
      width: calc(var(--speed) * 2rem + 1rem);
      height: calc(var(--speed) * 2rem + 1rem);
      line-height: 4rem;
      color: black;
      border-radius: 100%;
      text-align: center;
      position: fixed;
      transform: translate(-50%, -50%);
      top: var(--top);
      left: var(--left);
    }

    .blue.bubble {
      background-image: linear-gradient(
        var(--rotation, 15deg),
        #20c9ef 0%,
        #905ae9 100%
      );
    }

    .green.bubble {
      background-image: linear-gradient(
        var(--rotation, 15deg),
        #45cfed 0%,
        #ffe500 100%
      );
    }
  }
</style>
