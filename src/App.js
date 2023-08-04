import "./styles.css";

import { useState } from "react";

import words from "./data";

export default function App() {
  const [word, setWord] = useState(["No word", "No meaning"]);
  const [isOpen, setIsOpen] = useState(false);
  const getRandomNumber = () => {
    return Math.floor(Math.random() * words.length);
  };
  const randonWordsHandler = () => {
    setWord(words[getRandomNumber()]);
  };
  const wordsMeaningHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="app-main">
      <div className="app-container">
        <p className="app-title">Random words</p>
        <div className="app-word" onClick={wordsMeaningHandler}>
          <div className="word-left">{word[0]}</div>
        </div>
        {isOpen && (
          <div className="app-word" onClick={wordsMeaningHandler}>
            <div className="word-left">{word[1]}</div>
          </div>
        )}
        <div className="app-btn-grb">
          <button className="app-btn" onClick={randonWordsHandler}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
