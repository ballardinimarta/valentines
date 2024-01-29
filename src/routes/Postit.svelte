<script lang="ts">
  import Heart from "/static/heart.svg";
  export let name: string;
  export let text: string;
  export let rotation: string;
  export let color: string;
  export let x: string;
  export let y: string;
  export let z: number;

  const style = `
    --rotation: ${rotation}deg;
    --color: ${color};
    --x: ${x}px;
    --y: ${y}px;
    --z-index: ${z};

  `;
</script>

<div class="postit-wrap">
  <div class="postit" {style}>
    <h3>{name}</h3>
    <p>{text}</p>
  </div>
</div>

<style>
  .postit-wrap {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .postit {
    padding: 1rem;
    margin: 1rem;
    font-size: 1.5rem;
    width: 150px;
    height: 150px;
    margin: 5px;
    text-align: center;
    /* box-shadow: 3px 2px 1px #0000004d; */
    transform: rotate(var(--rotation));
    position: absolute;
    top: var(--y);
    left: var(--x);
    aspect-ratio: 1;
    border-image: radial-gradient(var(--color) 69%, #0000 70%) 84.5%/50%;
    clip-path: polygon(-41% 0, 50% 91%, 141% 0);
  }
  .postit h3 {
    font-size: 20px;
    font-family: var(--main-font);
    text-align: center;
    margin: 0;
    text-transform: capitalize;
  }
  .postit p {
    font-family: var(--handwriting-font);
    text-align: center;
    margin: 0;
  }
</style>
