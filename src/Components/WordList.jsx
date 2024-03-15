import React, { useState, useEffect, useRef } from "react";
import WordListWords from "./WordListWords";

const WordList = () => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);

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
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fnWordList();
    return;
  }, []);

  return (
    <div>
      <div>Word List</div>
      {wordList.map((item) => {
        return (
          <WordListWords
            key={item.id}
            id={item.id}
            Word={item.fields.Word}
            NumberRight={item.fields.NumberRight}
            NumberWrong={item.fields.NumberWrong}
            fnWordList={fnWordList}
          ></WordListWords>
        );
      })}
    </div>
  );
};

export default WordList;
