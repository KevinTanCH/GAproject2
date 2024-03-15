import React from "react";

const WordListWords = (props) => {
  return (
    <div>
      <div></div>
      {/* <div>{props.id}</div> */}
      <div>Word: {props.Word}</div>
      <div>Correct Times: {props.NumberRight}</div>
      <div>Wrong Times: {props.NumberWrong}</div>
    </div>
  );
};

export default WordListWords;
