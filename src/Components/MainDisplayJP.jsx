import React, { useState, useEffect, useRef } from "react";
import Dictionary from "./Dictionary";

const MainDisplayJP = () => {
  const [error, setError] = useState(null);
  const [word, setWord] = useState();
  const searchWordRef = useRef();

  const fnSearchWord = async () => {
    const url = "https://jotoba.de/api/search/kanji";
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchWordRef,
          language: "English",
          no_english: true,
        }),
      });

      if (!res.ok) {
        throw new Error("something went wrong2");
      }
      const data = await res.json();
      console.log(data);
      setWord(data.kanji[0].meanings[0]);
      console.log(data.kanji[0].meanings[0]);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fnSearchWord();
    return;
  }, []);
  const searchWord = () => {
    fnSearchWord();
  };

  return (
    <>
      <input
        type="text"
        ref={searchWordRef}
        placeholder="SearchWord"
        defaultValue="東"
        className="col-md-3"
      ></input>
      <button onClick={searchWord}>Search Word</button>
      <Dictionary word={word}></Dictionary>
    </>
  );
};

export default MainDisplayJP;
