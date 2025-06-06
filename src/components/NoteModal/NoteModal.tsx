// модальне вікно яке відкривається при створенні нотатки
import css from "./NoteModal.module.css";

interface NoteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export default function NoteModal({ onClose, children }: NoteModalProps) {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>{/* Компонент NoteForm */}</div>
    </div>
  );
}
