<script lang="ts">
  import { db } from "$lib/firebase/firebase";
  import { collection, getDocs } from "firebase/firestore";
  import Postit from "./Postit.svelte";
  import Logo from "./Logo.svelte";

  const getQuerySnapshot = async () => {
    return await getDocs(collection(db, "notes"));
  };

  let promise = getQuerySnapshot();
</script>

<h1><Logo /> Alster Lovebombing <Logo /></h1>
<div class="postit-board">
  {#await promise then guerySnapshot}
    {#each guerySnapshot.docs as doc}
      <Postit name={doc.data().name} text={doc.data().text} />
    {/each}
  {/await}
</div>

<style>
  h1 {
    font-size: 3rem;
    text-align: center;
  }
  .postit-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
