import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import Postit from "../components/Postit";
import Logo from "../components/Logo";
import styles from "./Home.module.css";

type Layout = { x: string; y: string; rotation: string; color: string };

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

const POSTIT_SIZE = 150;
const GAP = 4;
const MIN_DIST = POSTIT_SIZE + GAP;

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function overlaps(x1: number, y1: number, x2: number, y2: number): boolean {
  return !(
    x1 + MIN_DIST <= x2 ||
    x2 + MIN_DIST <= x1 ||
    y1 + MIN_DIST <= y2 ||
    y2 + MIN_DIST <= y1
  );
}

function buildLayouts(
  docIds: { id: string }[],
  width: number,
  height: number,
): Map<string, Layout> {
  const result = new Map<string, Layout>();
  const taken: { x: number; y: number }[] = [];
  const maxX = Math.max(0, width - POSTIT_SIZE);
  const maxY = Math.max(0, height - POSTIT_SIZE);
  const maxTries = 300;

  for (const { id } of docIds) {
    let placed = false;
    for (let t = 0; t < maxTries && !placed; t++) {
      const x = randomInteger(0, maxX);
      const y = randomInteger(0, maxY);
      if (taken.every((p) => !overlaps(x, y, p.x, p.y))) {
        taken.push({ x, y });
        const layout: Layout = {
          x: `${x}`,
          y: `${y}`,
          rotation: `${randomInteger(0, 1) ? "-" : ""}${randomInteger(0, 15)}`,
          color: `rgb(250, ${randomInteger(100, 200)}, ${randomInteger(150, 255)})`,
        };
        result.set(id, layout);
        placed = true;
      }
    }
    if (!placed) {
      let fallbackX = 0;
      let fallbackY = 0;
      outer: for (let py = 0; py <= maxY; py += MIN_DIST) {
        for (let px = 0; px <= maxX; px += MIN_DIST) {
          if (taken.every((p) => !overlaps(px, py, p.x, p.y))) {
            fallbackX = px;
            fallbackY = py;
            break outer;
          }
        }
      }
      const layout: Layout = {
        x: `${fallbackX}`,
        y: `${fallbackY}`,
        rotation: `${randomInteger(0, 1) ? "-" : ""}${randomInteger(0, 15)}`,
        color: `rgb(250, ${randomInteger(100, 200)}, ${randomInteger(150, 255)})`,
      };
      result.set(id, layout);
      taken.push({ x: fallbackX, y: fallbackY });
    }
  }
  return result;
}

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let unsubSnapshot: (() => void) | undefined;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (unsubSnapshot) unsubSnapshot();

        unsubSnapshot = onSnapshot(
          collection(db, "notes"),
          { includeMetadataChanges: true },
          (col) => {
            const width = boardRef.current?.offsetWidth ?? 1440;
            const height = boardRef.current?.offsetHeight ?? 900;
            const layoutMap = buildLayouts(
              col.docs.map((d) => ({ id: d.id })),
              width,
              height,
            );

            const documents = col.docs.map((document) => {
              const data = document.data();
              const layout = layoutMap.get(document.id)!;
              return {
                id: document.id,
                name: data.name,
                text: data.text,
                time: data.time ?? "0",
                ...layout,
              } as Note;
            });

            const sortedNotes = documents.sort((a, b) => {
              return parseInt(a.time) - parseInt(b.time);
            });

            setNotes(sortedNotes);
          },
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
          <Postit key={note.id} {...note} z={index} />
        ))}
      </div>
    </main>
  );
};

export default Home;
