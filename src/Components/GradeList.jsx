import React, { useState, useEffect, useRef } from "react";

const GradeList = () => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);

  const fnJLPTWordList = async () => {
    const url = "https://jlpt-vocab-api.vercel.app/api/words/random?level=5";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("something went wrong2");
      }
      const rawData = await res.json();
      console.log(rawData);
      setWordList(rawData);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fnJLPTWordList();
    return;
  }, []);

  return (
    <div>
      <div>Kanji Grade 1 Word List</div>
      <div>{wordList.word}</div>
    </div>
  );
};

export default GradeList;
