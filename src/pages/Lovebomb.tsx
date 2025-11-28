import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import styles from "./Lovebomb.module.css";

const emails = [
  "andreas.ljungstrom@alster.se",
  "anna.nord@alster.se",
  "astrid.taberman@alster.se",
  "benjamin.christ@alster.se",
  "christer.svensson@alster.se",
  "eric.nilsson@alster.se",
  "erik.wadman@alster.se",
  "fredrik.berglund@alster.se",
  "fredrik.jakobsson@alster.se",
  "fredrik.wetterholm@alster.se",
  "henrik.ganheim@alster.se",
  "jim.lofgren@alster.se",
  "joakim.carlsson@alster.se",
  "john.persson@alster.se",
  "jon.hammer@alster.se",
  "jonas.andersson@alster.se",
  "jonas.turnbull@alster.se",
  "karl.mork@alster.se",
  "karolina.sjostrand@alster.se",
  "kevin.candlert@alster.se",
  "kristoffer.karlsson@alster.se",
  "linda.cnattingius@alster.se",
  "louise.hvarfner@alster.se",
  "magnus.olsson@alster.se",
  "malin.nordlund@alster.se",
  "marcus.ahlstrom@alster.se",
  "marta.ballardini@alster.se",
  "martin.lind@alster.se",
  "mathias.petersen@alster.se",
  "matilda.rask@alster.se",
  "mats-hjalmar.murman@alster.se",
  "moa.wetterdal@alster.se",
  "niklas.karlsson@alster.se",
  "per.jaakonantti@alster.se",
  "philip.fryklund@alster.se",
  "rasmus.graham@alster.se",
  "robin.kammerlander@alster.se",
  "stefan.jansson@alster.se",
  "tobias.bergdahl@alster.se",
  "tobias.lendel@alster.se",
  "tommi.ojaskivi@alster.se",
  "veronika.ekstrom@alster.se",
];

const names = emails.map((email) => {
  const name = email.split("@")[0];
  const firstName = name.split(".")[0].replace(/^\w/, (c) => c.toUpperCase());
  const lastName = name.split(".")[1].replace(/^\w/, (c) => c.toUpperCase());
  return `${firstName} ${lastName[0]}`;
});

const Lovebomb: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [shuffledNames, setShuffledNames] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const shuffleArray = (namesList: string[]) => {
    const list = [...namesList];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  const handleRandomize = () => {
    setText("");
    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names[randomIndex];
    setName(selectedName);
    setStage((prev) => prev + 1); // 0 -> 1

    const newShuffled = shuffleArray(names);
    newShuffled[2] = selectedName; // Ensure the name is at index 2 (or wherever appropriate for display)
    setShuffledNames(newShuffled);

    setTimeout(() => {
      setStage((prev) => prev + 1); // 1 -> 2
    }, 3500);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "notes"), {
        name,
        text,
        time: new Date().getTime(),
      });
    } catch {
      console.log("error");
    }
    setStage((prev) => prev + 1); // 2 -> 3
  };

  const handleRestart = () => {
    setStage(0);
    handleRandomize();
  };

  return (
    <section className={styles.section}>
      {stage === 0 && (
        <>
          <button
            className={styles.randomNameBtn}
            onClick={handleRandomize}
          ></button>
          <span className={styles.btnText}>Slumpa fram namn</span>
        </>
      )}

      {stage === 1 && (
        <div className={styles.wrapper}>
          <div className={styles.heart}>
            <ul className={styles.listSpinner}>
              {shuffledNames.map((n, i) => (
                <li key={i} className={styles.spinnerItem}>
                  {n}
                </li>
              ))}
            </ul>
            <span className={styles.chosenName}>{name}</span>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className={styles.wrapper}>
          <div className={`${styles.heart} ${styles.stage2}`}>
            <span className={`${styles.chosenName} ${styles.stage2Name}`}>
              {name}
            </span>
          </div>
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <label>Skriv nåt du uppskattar med {name}</label>
            <input
              autoFocus
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.submitBtn}>
              Skicka
            </button>
          </form>
        </div>
      )}

      {stage === 3 && (
        <div className={styles.thanks}>
          <p>Tack för att du lovebombade {name}</p>
          <button onClick={handleRestart} className={styles.restartBtn}>
            Jag har mer kärlek att ge
          </button>
        </div>
      )}
    </section>
  );
};

export default Lovebomb;
