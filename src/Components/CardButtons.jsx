import React, { useState, useEffect } from "react";

const CardButtons = (props) => {
  console.log("Renders");
  const [error, setError] = useState(null);

  const fnRemoveWord = async () => {
    const url = "";
    console.log(url);
    setError(null);
    try {
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };
  const fnAddCorrect = async () => {
    const url = "";
    console.log(url);
    setError(null);
    try {
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };
  const fnAddWrong = async () => {
    const url = "";
    console.log(url);
    setError(null);
    try {
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };
  return (
    <>
      <button onClick={fnAddCorrect}>I remembered it</button>
      <button onClick={fnAddWrong}>I didn't remembered it</button>
      <button onClick={fnRemoveWord}>Remove Word</button>
    </>
  );
};

export default CardButtons;
