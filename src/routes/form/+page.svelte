<script lang="ts">
  import { db } from "../../lib/firebase/firebase";
  import { addDoc, collection } from "firebase/firestore";

  let text = "";
  let names = ["moa", "märta", "jessica", "märt"];
  let name = "";

  let stage = 0;

  const handleRandomize = () => {
    name = names[Math.floor(Math.random() * names.length)];
    stage++;
  };

  const handleOnSubmit = async () => {
    console.log(text);

    try {
      await addDoc(collection(db, "notes"), {
        name,
        text
      });

    } catch {
      console.log("error");
    }
    stage++
  };

  const handleRestart = () => {
    stage = 0;
    handleRandomize();
  };
</script>

{#if stage === 0}
  <button on:click={handleRandomize}>Slumpa fram namn</button>
{:else if stage === 1}
  <p>Du fick: {name}</p>
  <p>Skriv nåt du uppskatter med den här personen</p>
  <form on:submit={handleOnSubmit}>
    <input type="text" bind:value={text} />
    <button type="submit">Skicka</button>
  </form>
{:else}
  Du har nu skickat iväg kärlek till {name}
  <button on:click={handleRestart}>Skicka till någon annan</button>
{/if}
