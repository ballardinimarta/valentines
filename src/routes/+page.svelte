<script lang="ts">
  import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
  import Postit from "./Postit.svelte";
  import Logo from "./Logo.svelte";
  import { auth, db } from "$lib/firebase/firebase";
  import { onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";

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
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  onMount(() => {
    const width =
      (document.getElementById("postit-board")?.offsetWidth ?? 1440) - 200;
    const height =
      (document.getElementById("postit-board")?.offsetHeight ?? 900) - 200;

    let unsubSnapshot: () => void;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (unsubSnapshot) unsubSnapshot();
        unsubSnapshot = onSnapshot(
          collection(db, "notes"),
          { includeMetadataChanges: true },
          (col) => {
            const documents = col.docs.map((document) => {
              const NoteRef = doc(db, "notes", document.id);
              const rand = Boolean(Math.round(Math.random()));
              let rotation = `${rand ? "-" : ""}${randomInteger(0, 15)}`;
              let color = `rgb(250, ${randomInteger(100, 200)},${randomInteger(
                150,
                255
              )} )`;

              let x = `${randomInteger(200, width)}`;
              let y = `${randomInteger(200, height)}`;
              if (!document.data().color) {
                updateDoc(NoteRef, {
                  color: color,
                });
              }

              if (
                document.data().rotation === undefined ||
                document.data().rotation === null
              ) {
                updateDoc(NoteRef, { rotation: rotation });
              }
              if (
                document.data().x === undefined ||
                document.data().x === null
              ) {
                console.log("x", x, document.data().text);
                updateDoc(NoteRef, { x: x });
              }
              if (
                document.data().y === undefined ||
                document.data().y === null
              ) {
                console.log("y", y, document.data().text);
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
          }
        );
      }
    });
    return () => {
      if (unsubSnapshot) unsubSnapshot();
      unsubAuth();
    };
  });
</script>

<main>
  <div>
    <h1><Logo /> Alster Lovebombing <Logo /></h1>
  </div>
  <img src="/qr.png" alt="qrcode" />

  <div class="postit-board" id="postit-board">
    {#each notes as note, index}
      {#if note.x && note.y && note.rotation && note.color}
        <Postit {...note} z={index} />
      {/if}
    {/each}
  </div>
</main>

<style>
  main {
    background-image: linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  h1 {
    font-size: 3rem;
    text-align: center;
  }
  img {
    width: 150px;
    height: 150px;
    position: absolute;
    bottom: 0;

    right: 0;
  }
  .postit-board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 90vh;
    width: 100%;
  }
</style>
