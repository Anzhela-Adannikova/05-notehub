// контейнер додатка
import { useState } from "react";
import css from "./App.module.css";
import type { Note } from "../../types/note";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
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
      {data && !isLoading && <NoteList notes={data} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
