import React, { useState, useEffect } from "react";
import CardButtons from "./CardButtons.jsx";

const Card = (props) => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [data, setData] = useState("NoData");
  const [wordMeaning, setWordMeaning] = useState();
  const [staReadKana, setstaReadKana] = useState();
  const [staReadKanji, setstaReadKanji] = useState();
  const [staReadFurigana, setstaReadFurigana] = useState();

  const fnSearchWord = async () => {
    const url = "https://jotoba.de/api/search/words";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: props.strCardWord,
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
      <div>Kana: {staReadKana}</div>
      <div>Kanji: {staReadKanji}</div>
      <div>Furigana: {staReadFurigana}</div>
      <div>Meaning: {wordMeaning}</div>
      <CardButtons strCardWord={props.strCardWord}></CardButtons>
    </div>
  );
};

export default Card;
