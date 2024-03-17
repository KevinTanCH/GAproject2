import React, { useState, useEffect, useRef } from "react";
import GradeWordListWords from "./GradeWordListWords";

const GradeList = () => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);

  const fnWordList = async () => {
    const url = "https://kanjiapi.dev/v1/kanji/grade-1";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      <div>Kanji Grade 1 Word List</div>
      {wordList.map((item) => {
        return (
          <GradeWordListWords key={item.id} Word={item}></GradeWordListWords>
        );
      })}
    </div>
  );
};

export default GradeList;
