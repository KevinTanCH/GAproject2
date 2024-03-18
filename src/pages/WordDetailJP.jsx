import React, { useState, useEffect, useRef } from "react";
import AddToWordList from "../Components/AddToWordList";

const WordDetailJP = (props) => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [data, setData] = useState("NoData");
  const [wordMeaning, setWordMeaning] = useState();
  const [staReadKana, setstaReadKana] = useState();
  const [staReadKanji, setstaReadKanji] = useState();
  const [staReadFurigana, setstaReadFurigana] = useState();
  const refSearchWord = useRef();
  const refSearchType = useRef();

  const fnSearchWord = async () => {
    const url = "https://jotoba.de/api/search/" + refSearchType.current.value;
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: refSearchWord.current.value,
          language: "English",
          no_english: true,
        }),
      });
      if (!res.ok) {
        throw new Error("something went wrong2");
      }
      const rawData = await res.json();
      console.log(rawData);
      setData(rawData);
      switch (refSearchType.current.value) {
        case "words":
          setWordMeaning(data.words[0].senses[0].glosses.join(", "));
          console.log(wordMeaning);
          setstaReadKana(data.words[0].reading.kana);
          setstaReadKanji(data.words[0].reading.kanji);
          setstaReadFurigana(data.words[0].reading.furigana);
          let arrTempWordMeaining = [];
          for (const item of data.words[0].senses) {
            console.log(item.glosses);
            arrTempWordMeaining = arrTempWordMeaining.concat(item.glosses);
            console.log("arrTempWordMeaining " + arrTempWordMeaining);
          }
          setWordMeaning(arrTempWordMeaining.join(", "));
          console.log("WordMeaning " + wordMeaning);
          break;
        case "kanji":
          let arrTempKanji = [];
          for (const item of data.Kanji) {
            console.log(item.onyomi);
            arrTempKanji = arrTempKanji.concat(item.glosses);
            console.log("arrTempKanji " + arrTempKanji);
          }
          break;
        default:
          console.log("Search type selection error");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fnSearchWord();
    return;
  }, []);

  return (
    <div>
      <div>
        <select ref={refSearchType}>
          <option value="words">Word</option>
          <option value="kanji">Kanji</option>
        </select>
        <input
          type="text"
          ref={refSearchWord}
          placeholder="Type here to search Word"
          defaultValue="辞書"
          className="col-md-3"
        ></input>
        <button onClick={fnSearchWord}>Search Word</button>
      </div>
      <div>
        <div>Kana: {staReadKana}</div>
        <div>Kanji: {staReadKanji}</div>
        <div>Furigana: {staReadFurigana}</div>
        <div>Meaning: {wordMeaning}</div>
        <AddToWordList staReadKanji={staReadKanji}></AddToWordList>
      </div>
    </div>
  );
};

export default WordDetailJP;
