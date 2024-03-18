import React, { useState, useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import WordDetailJP from "../pages/WordDetailJP";
import WordList from "../pages/WordList";
import FlashCard from "../pages/FlashCard";
import NotFound from "../pages/NotFound";
import GradeList from "./GradeList";
import NavBar from "./NavBar";

const MainDisplayJP = () => {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="main" element={<WordDetailJP></WordDetailJP>} />
        <Route path="flashcard" element={<FlashCard></FlashCard>} />
        <Route path="wordlist" element={<WordList></WordList>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <GradeList></GradeList> */}
    </>
  );
};

export default MainDisplayJP;
