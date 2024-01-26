<script lang="ts">
  import { collection, doc, onSnapshot } from "firebase/firestore";
  import Postit from "./Postit.svelte";
  import Logo from "./Logo.svelte";
  import { db } from "$lib/firebase/firebase";

  import { onMount } from "svelte";
  type Note = {
    name: string;
    text: string;
    x: string;
    y: string;
    rotation: string;
    color: string;
  };

  let notes: Note[] = [];

  // Set up a listener for real-time updates
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  onMount(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),
      { includeMetadataChanges: true },
      (doc) => {
        const documents = doc.docs.map((doc) => {
          doc.data();
          return {
            name: doc.data().name,
            text: doc.data().text,
            rotation: `-${rand(0, 15)}`,
            color: `rgb(250, ${rand(100, 200)},${rand(150, 255)} )`,
            x: `${rand(10, 90)}`,
            y: `${rand(10, 90)}`,
          };
        });
        notes = documents;
      }
    );
    return () => {
      unsub();
    };
  });
</script>

<h1><Logo /> Alster Lovebombing <Logo /></h1>
<div class="postit-board">
  {#each notes as note}
    <Postit {...note} />
  {/each}
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
