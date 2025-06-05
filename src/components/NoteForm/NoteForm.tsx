// форма створення нотатки
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import type { NewNoteData } from "../../types/note";
import { createNote } from "../../services/noteService";

export default function NoteForm () {
const queryClient = useQueryClient();

    const { mutate } = useMutation ({
        mutationFn: (noteData:  NewNoteData) => createNote (noteData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"]})
        }
    });
     
    const handleSubmit = (noteData: NoteData) => {
        mutate({

        })
    }


return (
    <form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <input id="title" type="text" name="title" className={css.input} />
    <span name="title" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <textarea
      id="content"
      name="content"
      rows="8"
      className={css.textarea}
    />
    <span name="content" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <select id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
    <span name="tag" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled=false
    >
      Create note
    </button>
  </div>
</form>

)
}