// контейнер додатка
import { useState } from "react";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import NoteModal from "../NoteModal/NoteModal";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 12;

  const { data, isLoading } = useQuery({
    queryKey: ["notes", currentPage, searchTerm],
    queryFn: () => fetchNotes(currentPage + 1, searchTerm, perPage),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        <SearchBox onSearch={setSearchTerm} />
      </header>
      {isLoading && <strong className={css.loading}>Loading notes...</strong>}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          pageCount={data.totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
        />
      )}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </NoteModal>
      )}
    </div>
  );
}
