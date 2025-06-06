// контейнер додатка
import { useState } from "react";
import css from "./App.module.css";
import type { Note } from "../../types/note";
import { fetchNotes } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import NoteModal from "../NoteModal/NoteModal";

export default function App() {
  const { data, isLoading } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });
  console.log("📦 notes from useQuery:", data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {/* {data && !isLoading && <NoteList notes={data} />} */}
      {Array.isArray(data) && <NoteList notes={data} />}
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </NoteModal>
      )}
    </div>
  );
}
