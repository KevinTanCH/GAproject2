import React, { useState, useEffect } from "react";
import Card from "./Card";

const FlashCard = () => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [strCardWord, setstrCardWord] = useState("");

  const fnWordList = async () => {
    const url = "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer pat6WdpNvKDDAw3LX.72ffa969bb303692f3381919787b40f6c24cd7cfee10a6e1980a42cf1c13641c",
        },
      });
      if (!res.ok) {
        throw new Error("something went wrong2");
      }
      const rawData = await res.json();
      console.log(rawData.records);
      setWordList(rawData.records);
      const intRandNum = Math.floor(Math.random() * wordList.length);
      console.log(intRandNum);
      setstrCardWord(wordList[intRandNum].fields.Word);
      console.log(strCardWord);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    return;
  }, [strCardWord]);

  return (
    <>
      <div>Flashcard {strCardWord}</div>
      <button onClick={fnWordList}>Start</button>
      <Card strCardWord={strCardWord}></Card>
    </>
  );
};

export default FlashCard;
