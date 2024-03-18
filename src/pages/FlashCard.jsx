import React, { useState, useEffect, useRef } from "react";
import Card from "../Components/Card";

const FlashCard = () => {
  console.log("Renders");
  const [error, setError] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [strCardWord, setstrCardWord] = useState("");
  const [strAirtableID, setstrAirtableID] = useState("");
  const [strCorrectTimes, setstrCorrectTimes] = useState("");
  const [strWrongTimes, setstrWrongTimes] = useState("");
  const refFromWhichWordList = useRef();

  const fnFlashCardWordList = async () => {
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
      setstrAirtableID(wordList[intRandNum].id);
      setstrWrongTimes(wordList[intRandNum].fields.NumberWrong);
      setstrCorrectTimes(wordList[intRandNum].fields.NumberRight);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  const fnJLPTWordList = async () => {
    const url =
      "https://jlpt-vocab-api.vercel.app/api/words/random?level=" +
      refFromWhichWordList.current.value;
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
      setstrCardWord(wordList.word);
      console.log(strCardWord);
      setstrAirtableID("No ID as Not Airtable");
      console.log("No ID as Not Airtable");
      setstrWrongTimes("No wrong as Not Airtable");
      setstrCorrectTimes("No right as Not Airtable");
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  const fnStartFlashCard = async () => {
    try {
      if (refFromWhichWordList.current.value === "Airtable") {
        fnFlashCardWordList();
      } else {
        fnJLPTWordList();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    return;
  }, [strCardWord]);

  return (
    <>
      <div>
        <select ref={refFromWhichWordList}>
          <option value="Airtable">Personal Word List</option>
          <option value="5">JLPT N5</option>
          <option value="4">JLPT N4</option>
          <option value="3">JLPT N3</option>
          <option value="2">JLPT N2</option>
          <option value="1">JLPT N1</option>
        </select>
        <button onClick={fnStartFlashCard}>Start</button>
      </div>
      <h1>Flashcard Word: {strCardWord}</h1>
      <Card
        strCardWord={strCardWord}
        strAirtableID={strAirtableID}
        strCorrectTimes={strCorrectTimes}
        strWrongTimes={strWrongTimes}
      ></Card>
    </>
  );
};

export default FlashCard;
