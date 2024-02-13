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

<div class="postit-wrap" {style}>
  <div class="postit" {style}>
    <h3>{name}</h3>
    <p>{text}</p>
  </div>
</div>

<style>
  .postit-wrap {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    position: absolute;
    top: var(--y);
    left: var(--x);
  }
  .postit {
    padding: 1rem;
    margin: 1rem;
    font-size: 1.5rem;
    width: 150px;
    height: 150px;
    margin: 5px;
    text-align: center;
    transform: rotate(var(--rotation));
    background-color: var(--color);
    aspect-ratio: 1;

    mask:
      radial-gradient(at 70% 31%, #000 29%, #0000 30%),
      radial-gradient(at 30% 31%, #000 29%, #0000 30%),
      linear-gradient(#000 0 0) bottom/100% 50% no-repeat;
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
