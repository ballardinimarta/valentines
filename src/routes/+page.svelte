<script lang="ts">
  import {
    collection,
    doc,
    onSnapshot,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
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
    id: string;
    time: string;
  };

  let notes: Note[] = [];

  // Set up a listener for real-time updates
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  onMount(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),
      { includeMetadataChanges: true },
      (col) => {
        const documents = col.docs.map((document) => {
          const NoteRef = doc(db, "notes", document.id);
          console.log(window.screen.width, window.screen.height);
          let color = `rgb(250, ${rand(100, 200)},${rand(150, 255)} )`;
          let rotation = `-${rand(0, 15)}`;
          let x = `${rand(200, window.screen.width - 300)}`;
          let y = `${rand(200, window.screen.height - 300)}`;

          if (!document.data().color) {
            console.log("color");
            updateDoc(NoteRef, {
              color: color,
            });
          }
          if (!document.data().rotation) {
            console.log("rotation");
            updateDoc(NoteRef, { rotation: rotation });
          }
          if (!document.data().x) {
            console.log("x");
            updateDoc(NoteRef, { x: x });
          }
          if (!document.data().y) {
            console.log("y");
            updateDoc(NoteRef, { y: y });
          }

          return {
            id: document.id,
            name: document.data().name,
            text: document.data().text,
            rotation: document.data().rotation,
            color: document.data().color,
            x: document.data().x,
            y: document.data().y,
            time: document.data().time ?? "0",
          };
        });
        notes = [...documents].sort((a, b) => {
          return parseInt(a.time) - parseInt(b.time);
        });
        console.log(notes.map((note) => note.time));
      }
    );
    return () => {
      unsub();
    };
  });
</script>

<h1><Logo /> Alster Lovebombing <Logo /></h1>
<button
  on:click={() => {
    notes.forEach((document) => {
      const NoteRef = doc(db, "notes", document.id);
      deleteDoc(NoteRef);
    });
  }}>rensa</button
>
<div class="postit-board">
  {#each notes as note, index}
    {#if note.x && note.y && note.rotation && note.color}
      <Postit {...note} z={index} />
    {/if}
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
