import React, { useState, useEffect } from "react";

const WordListWords = (props) => {
  const [error, setError] = useState(null);

  const fnDeleteWord = async () => {
    const url =
      "https://api.airtable.com/v0/appLSLw8PUd7mVHHF/WordList/" + props.id;
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
              id: props.id,
              deleted: true,
            },
          ],
        }),
      });
      if (!res.ok) {
        throw new Error("something went wrong2");
      }
      const rawData = await res.json();
      console.log(rawData);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        console.log(error);
      }
    }
  };
  return (
    <div className="row">
      {/* <div>{props.id}</div> */}
      <div className="col-sm-2">Word: {props.Word}</div>
      <div className="col-sm-2">Correct Times: {props.NumberRight}</div>
      <div className="col-sm-2">Wrong Times: {props.NumberWrong}</div>
      <button className="col-sm-2" onClick={fnDeleteWord}>
        delete
      </button>
    </div>
  );
};

export default WordListWords;
