import React, { useEffect, useState, useRef } from 'react';
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import Postit from "../components/Postit";
import Logo from "../components/Logo";
import styles from './Home.module.css';

interface Note {
  name: string;
  text: string;
  x: string;
  y: string;
  rotation: string;
  color: string;
  id: string;
  time: string;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const width = (boardRef.current?.offsetWidth ?? 1440) - 200;
    const height = (boardRef.current?.offsetHeight ?? 900) - 200;

    let unsubSnapshot: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (unsubSnapshot) unsubSnapshot();
        
        unsubSnapshot = onSnapshot(
          collection(db, "notes"),
          { includeMetadataChanges: true },
          (col) => {
            const documents = col.docs.map((document) => {
              const data = document.data();
              const NoteRef = doc(db, "notes", document.id);
              const rand = Boolean(Math.round(Math.random()));
              
              // Logic to update missing fields if they don't exist
              let rotation = data.rotation;
              let color = data.color;
              let x = data.x;
              let y = data.y;

              const newRotation = `${rand ? "-" : ""}${randomInteger(0, 15)}`;
              const newColor = `rgb(250, ${randomInteger(100, 200)},${randomInteger(150, 255)} )`;
              const newX = `${randomInteger(200, width)}`;
              const newY = `${randomInteger(200, height)}`;

              if (!color) {
                updateDoc(NoteRef, { color: newColor });
                color = newColor;
              }

              if (rotation === undefined || rotation === null) {
                updateDoc(NoteRef, { rotation: newRotation });
                rotation = newRotation;
              }
              
              if (x === undefined || x === null) {
                console.log("x", newX, data.text);
                updateDoc(NoteRef, { x: newX });
                x = newX;
              }
              
              if (y === undefined || y === null) {
                console.log("y", newY, data.text);
                updateDoc(NoteRef, { y: newY });
                y = newY;
              }

              return {
                id: document.id,
                name: data.name,
                text: data.text,
                rotation: rotation,
                color: color,
                x: x,
                y: y,
                time: data.time ?? "0",
              } as Note;
            });

            const sortedNotes = documents.sort((a, b) => {
              return parseInt(a.time) - parseInt(b.time);
            });
            
            setNotes(sortedNotes);
          }
        );
      }
    });

    return () => {
      if (unsubSnapshot) unsubSnapshot();
      unsubAuth();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.h1}>
          <Logo /> Alster Lovebombing <Logo />
        </h1>
      </div>
      <img src="/qr.png" alt="qrcode" className={styles.qr} />

      <div className={styles.postitBoard} id="postit-board" ref={boardRef}>
        {notes.map((note, index) => (
          (note.x && note.y && note.rotation && note.color) ? (
            <Postit key={note.id} {...note} z={index} />
          ) : null
        ))}
      </div>
    </main>
  );
};

export default Home;

