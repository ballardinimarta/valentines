import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Clear: React.FC = () => {
  const [noteIds, setNoteIds] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),
      { includeMetadataChanges: true },
      (col) => {
        const ids = col.docs.map((document) => document.id);
        setNoteIds(ids);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleClear = () => {
    noteIds.forEach((id) => {
      const NoteRef = doc(db, "notes", id);
      deleteDoc(NoteRef);
    });
  };

  return (
    <button onClick={handleClear}>
      rensa
    </button>
  );
};

export default Clear;

