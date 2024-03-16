import React, { useState, useEffect } from "react";

const CardButtons = (props) => {
  console.log("Renders");
  const [error, setError] = useState(null);

  const fnRemoveWord = async () => {
    let numAddCorrect = 0;
    numAddCorrect = Number(props.strCorrectTimes) + 1;
    const strNumAddCorrect = numAddCorrect.toString();
    const url =
      "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList/" +
      props.strAirtableID;
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer pat6WdpNvKDDAw3LX.72ffa969bb303692f3381919787b40f6c24cd7cfee10a6e1980a42cf1c13641c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: props.strAirtableID,
              fields: {
                NumberWrong: strNumAddCorrect,
              },
            },
          ],
        }),
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
  const fnAddCorrect = async () => {
    let numAddCorrect = 0;
    numAddCorrect = Number(props.strCorrectTimes) + 1;
    const strNumAddCorrect = numAddCorrect.toString();
    const url = "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization:
            "Bearer pat6WdpNvKDDAw3LX.72ffa969bb303692f3381919787b40f6c24cd7cfee10a6e1980a42cf1c13641c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: props.strAirtableID,
              fields: {
                NumberWrong: strNumAddCorrect,
              },
            },
          ],
        }),
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
  const fnAddWrong = async () => {
    let numAddWrong = 0;
    numAddWrong = Number(props.strWrongTimes) + 1;
    const strNumAddWrong = numAddWrong.toString();
    const url = "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList";
    console.log(url);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization:
            "Bearer pat6WdpNvKDDAw3LX.72ffa969bb303692f3381919787b40f6c24cd7cfee10a6e1980a42cf1c13641c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: props.strAirtableID,
              fields: {
                NumberWrong: strNumAddWrong,
              },
            },
          ],
        }),
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

  return (
    <>
      <button onClick={fnAddCorrect}>I remembered it</button>
      <button onClick={fnAddWrong}>I didn't remembered it</button>
      <button onClick={fnRemoveWord}>Remove Word</button>
    </>
  );
};

export default CardButtons;
