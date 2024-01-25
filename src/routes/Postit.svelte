<script lang="ts">
  export let name;
  export let text;
  export let tilt = 0;
  console.log(window.screen.height);
  const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const style = `
    --rotation: -${rand(0, 15)}deg;
    --color: rgb(250, ${rand(100, 200)},${rand(150, 255)} );
    --x: ${rand(100, window.screen.width - 100)}px;
    --y: ${rand(150, window.screen.height - 250)}px;

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
