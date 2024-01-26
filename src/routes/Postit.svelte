<script lang="ts">
  export let name: string;
  export let text: string;
  export let rotation: string;
  export let color: string;
  export let x: string;
  export let y: string;

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const style = `
    --rotation: ${rotation}deg;
    --color: ${color};
    --x: ${x}%;
    --y: ${y}%;

  `;
</script>

<div class="postit" {style}>
  <h3>{name}</h3>
  <p>{text}</p>
</div>

<style>
  .postit {
    background-color: var(--color);
    padding: 1rem;
    margin: 1rem;
    font-size: 1.5rem;
    width: 100px;
    height: 100px;
    margin: 5px;
    text-align: center;
    box-shadow: 3px 2px 1px #0000004d;
    transform: rotate(var(--rotation));
    position: absolute;
    top: var(--y);
    left: var(--x);
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
