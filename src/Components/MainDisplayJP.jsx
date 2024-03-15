import React, { useState, useEffect, useRef } from "react";
import WordDetailJP from "./WordDetailJP";
import WordList from "./WordList";
import FlashCard from "./FlashCard";

const MainDisplayJP = () => {
  return (
    <>
      <WordDetailJP></WordDetailJP>
      <br />
      <FlashCard></FlashCard>
      <br />
      <WordList></WordList>
    </>
  );
};

export default MainDisplayJP;
