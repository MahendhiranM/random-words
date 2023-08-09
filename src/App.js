import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import words from "./data";

export default function App() {
  const [word, setWord] = useState("No word");
  const [tamilWord, setTamilWord] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTableShow, setIsTableShow] = useState(false);

  useEffect(() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    axios
      .get(url)
      .then((res) => {
        const phoneticWord = res.data[0].phonetic;
        setPhonetic(phoneticWord);
      })
      .catch((error) => {
        setPhonetic("");
        console.log(error);
      });
  }, [word]);

  useEffect(() => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURI(
      word
    )}`;
    axios
      .get(url)
      .then((res) => {
        setTamilWord(res.data[0][0][0]);
      })
      .catch((error) => {
        setTamilWord("");
        console.log(error);
      });
  }, [word]);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * words.length);
  };

  const randonWordsHandler = () => {
    setWord(words[getRandomNumber()]);
  };

  const wordsMeaningHandler = () => {
    setIsOpen(!isOpen);
  };

  const tableHandler = () => {
    setIsTableShow(!isTableShow);
  };

  return (
    <>
      {isTableShow ? (
        <div className="table-con" onDoubleClick={tableHandler} >
          <table>
            <tr>
              <th>S.No</th>
              <th>Word</th>
            </tr>
            {words.map((wrd, i) => (
              <tr>
                <td>{i}</td>
                <td>{wrd}</td>
              </tr>
            ))}
          </table>
        </div>
      ) : (
        <div className="app-main">
          <div className="app-container">
            <p className="app-title">Random words</p>
            <div className="word-con word" onClick={wordsMeaningHandler}>
              <div className="word-left">
                {word[0].toUpperCase() + word.substring(1)}
              </div>
              <div className="word-right">
                <p className="word-phonetic">{phonetic}</p>
              </div>
            </div>
            {isOpen && (
              <div
                className="word-con word-meaning"
                onClick={wordsMeaningHandler}
              >
                <div className="word-left">{tamilWord}</div>
              </div>
            )}
            <div className="app-btn-grb">
              <button
                className="app-btn"
                onClick={randonWordsHandler}
                onDoubleClick={tableHandler}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
