// контейнер додатка

import { useState, useEffect } from "react";
import css from "./App.module.css";
import type { Note } from "../../types/note";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

interface AppProps {}

export default function App({}: AppProps) {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
