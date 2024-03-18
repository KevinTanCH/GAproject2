import React, { useState } from "react";

const AddToWordList = (props) => {
  console.log("Renders");
  const [error, setError] = useState(null);
  let strWhatWord = "";

  const fnCheckWordListToAdd = async () => {
    const url = "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList";
    console.log(url);
    setError(null);
    try {
      let boolIsWordInList = false;
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
      console.log("Word List words: " + rawData.records);
      console.log(rawData.records);
      strWhatWord = props.staReadKanji;
      console.log(strWhatWord);
      for (let items of rawData.records) {
        console.log("Checking if duplicate word.");
        console.log(items.fields.Word + " " + strWhatWord);
        if (items.fields.Word === strWhatWord) {
          boolIsWordInList = true;
          break;
        }
      }
      fnAddWordToList(boolIsWordInList);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
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
                  Word: strWhatWord,
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
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button onClick={fnCheckWordListToAdd}>Add To Word List</button>
    </div>
  );
};

export default AddToWordList;
