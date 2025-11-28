<script lang="ts">
  import { db } from "$lib/firebase/firebase";
  import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";

  let notes: any[] = [];

  onMount(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),
      { includeMetadataChanges: true },
      (col) => {
        col.docs.map((document) => {
          notes.push(document.id);
        });

        return () => {
          unsub();
        };
      }
    );
  });
</script>

<button
  on:click={() => {
    notes.forEach((document) => {
      const NoteRef = doc(db, "notes", document);
      deleteDoc(NoteRef);
    });
  }}>rensa</button
>
