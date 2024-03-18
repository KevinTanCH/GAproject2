import React, { useState, useEffect, useRef } from "react";

const WordListAdd = (props) => {
  console.log("Renders");
  const refWordToBeAdded = useRef();
  const [error, setError] = useState(null);

  const fnWordListAdd = () => {
    let boolIsWordInList = false;
    for (let items of props.wordList) {
      console.log("Checking if duplicate word.");
      console.log(items.fields.Word + " " + refWordToBeAdded.current.value);
      if (items.fields.Word === refWordToBeAdded.current.value) {
        boolIsWordInList = true;
        break;
      }
    }
    fnAddWordToList(boolIsWordInList);
  };

  const fnAddWordToList = async (boolVar) => {
    const url = "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList";
    console.log(url);
    setError(null);
    try {
      if (boolVar) {
      } else {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer pat6WdpNvKDDAw3LX.72ffa969bb303692f3381919787b40f6c24cd7cfee10a6e1980a42cf1c13641c",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                fields: {
                  Word: refWordToBeAdded.current.value,
                  NumberRight: "0",
                  NumberWrong: "0",
                },
              },
            ],
          }),
        });
        if (!res.ok) {
          throw new Error("something went wrong2");
        }
        const rawData = await res.json();
        console.log(rawData);

        props.setWordList((prev) => [
          ...prev,
          {
            fields: {
              Word: refWordToBeAdded.current.value,
              NumberRight: "0",
              NumberWrong: "0",
            },
          },
        ]);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };
  return (
    <>
      <input
        type="text"
        ref={refWordToBeAdded}
        placeholder="Type here to add Word to word list"
        className="col-md-3"
      ></input>
      <button onClick={fnWordListAdd}>Add to Word List</button>
    </>
  );
};

export default WordListAdd;
