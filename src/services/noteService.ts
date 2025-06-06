import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteServiceClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const fetchNotes = async (page = 1, query = ""): Promise<Note[]> => {
  const params: Record<string, string | number> = { page };
  if (query) params.query = query;

  const res = await noteServiceClient.get<{ notes: Note[] }>("/", { params });
  return res.data.notes;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await noteServiceClient.post<Note>("/", noteData);
  return res.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await noteServiceClient.delete<Note>(`/${noteId}`);
  return res.data;
};
