<script lang="ts">
  import { db } from "../../lib/firebase/firebase";
  import { addDoc, collection } from "firebase/firestore";

  let text = "";
  const names = [
    "Alexiz",
    "Andreas",
    "Anna",
    "Astrid",
    "Benjamin",
    "Christer",
    "Cornelia",
    "Ebba",
    "Eric",
    "Erik",
    "Fredrik B",
    "Fredrik J",
    "Feke",
    "Hanna",
    "Henrik",
    "Jessica",
    "Jim",
    "Jocke",
    "Joakim C",
    "Johanna",
    "John",
    "Jon-henrik",
    "Jonas A",
    "Jonas T",
    "Karl",
    "Karolina",
    "Kevin",
    "Kristoffer",
    "Linda",
    "Lisa",
    "Magnus",
    "Malin",
    "Marcus A",
    "Markus K",
    "Märta",
    "Martin L",
    "Mathias",
    "Matilda",
    "Mats-hjalmar",
    "Moa",
    "Niklas",
    "Olivia",
    "Per",
    "Philip",
    "Rasmus",
    "Robin",
    "Stefan",
    "Tobias L",
    "Tobias b",
    "Tommi",
    "Tyra",
    "Veronika",
    "Viktor",
    "Alster",
    "Web Eco",
    "Commerce",
    "Mobile X",
  ];

  let shuffledNames: string[] = [];
  let name = "";
  let randomIndex = 0;
  let stage = 0;

  const handleRandomize = () => {
    text = "";
    randomIndex = Math.floor(Math.random() * names.length);
    name = names[randomIndex];
    stage++;

    shuffledNames = shuffleArray(names);
    shuffledNames[2] = name;

    setTimeout(() => {
      stage++;
    }, 3500);
  };

  const shuffleArray = (namesList: string[]) => {
    for (let i = namesList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [namesList[i], namesList[j]] = [namesList[j], namesList[i]];
    }
    return namesList;
  };

  const handleOnSubmit = async () => {
    try {
      await addDoc(collection(db, "notes"), {
        name,
        text,
        time: new Date().getTime(),
      });
    } catch {
      console.log("error");
    }
    stage++;
  };

  const handleRestart = () => {
    stage = 0;
    handleRandomize();
  };
</script>

<section>
  {#if stage === 0}
    <button class="random-name-btn" on:click={handleRandomize}></button>
    <span class="btn-text">Slumpa fram namn</span>
  {:else if stage === 1}
    <div class="wrapper">
      <div class="heart"></div>
      <ul class="list-spinner">
        {#each shuffledNames as n}
          <li>{n}</li>
        {/each}
      </ul>
      <span class="chosen-name">{name}</span>
    </div>
  {:else if stage === 2}
    <div class="wrapper">
      <div class="heart stage-2">
        <span class="chosen-name stage-2">{name}</span>
      </div>
      <form on:submit={handleOnSubmit}>
        <label>Skriv nåt du uppskattar med {name}</label>
        <input autofocus type="text" bind:value={text} />
        <button type="submit">Skicka</button>
      </form>
    </div>
  {:else}
    <div class="thanks">
      <p>Tack för att du lovebombade {name}</p>
      <button on:click={handleRestart}>Jag har mer kärlek att ge</button>
    </div>
  {/if}
</section>

<style>
  section {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .random-name-btn,
  .heart {
    color: white;
    background-color: transparent;
    border: none;
    background-image: url("/heart.png");
    background-size: contain;
    background-repeat: no-repeat;
    height: 70vw;
    width: 70vw;
    max-height: 500px;
    max-width: 500px;
    animation: beatingHeart 1s infinite;
  }

  .heart.stage-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: none;
    animation: moveHeart 1s;
    position: absolute;
    transform: scale(0.8) translateY(-250px);
  }

  .btn-text {
    position: absolute;
    top: 48vh;
    color: white;
    text-transform: uppercase;
    pointer-events: none;
    font-size: 4vw;
  }

  .list-spinner {
    height: 100%;
    overflow: hidden;
    position: absolute;
    list-style-type: none;
    padding-left: 0;
    font-size: 8vw;
    text-align: center;
    color: var(--bg-color);
    /* color: white; */
    text-transform: uppercase;
    top: 6.5vw;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  li {
    animation: spinLi 2s;
    opacity: 0;
    transition-timing-function: cubic-bezier(0, 1.15, 0, 0.9);
  }

  .chosen-name {
    position: absolute;
    color: white;
    text-transform: uppercase;
    font-size: 8vw;
    animation: showChosen 2s;
    top: 38.1%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    color: white;
  }

  .chosen-name.stage-2 {
    position: relative;
    animation: none;
    top: -3.5vw;
  }

  .wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    font-size: 1.5rem;
    text-align: center;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  input {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    color: var(--dark-burgundy);
    font-family: var(--main-font);
    font-size: 1rem;
    text-align: center;
  }
  button[type="submit"],
  .thanks button {
    width: calc(100% + 4px);
    height: 50px;
    border: none;
    color: white;
    background-color: #ff312e;
    text-transform: uppercase;
    font-family: var(--main-font);
    font-size: 1rem;
  }

  .thanks {
    display: flex;
    flex-direction: column;
    padding: 50px;
    text-align: center;
  }

  .thanks p {
    font-size: 2rem;
    margin-top: -40px;
  }

  @keyframes beatingHeart {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes spinLi {
    0% {
      transform: translateY(-200vh);
      opacity: 1;
    }

    95% {
      opacity: 1;
      transform: translateY(0);
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes showChosen {
    0% {
      opacity: 0;
    }

    90% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes moveHeart {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.8) translateY(-250px);
    }
  }
</style>
