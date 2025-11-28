<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Jersey+15&display=swap"
  rel="stylesheet"
/>
<slot />

<style>
  :global(body) {
    --handwriting-font: "Jersey 10", monospace;
    --main-font: "Jersey 15", monospace;
    --dark-burgundy: #4c0417;
    --bg-color: rgb(251, 206, 213);
    --pink: #fda4ff;
    --light-pink: #fdcdfe;

    background-image: url("/bg.png");
    margin: 0;
    color: var(--light-pink);
    font-family: var(--main-font);
  }
</style>
