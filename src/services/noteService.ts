import axios from "axios";
import type { Note } from "../types/note";

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

  const response = await noteServiceClient.get("/", { params });
  return response.data;
};

export const createNote = async (
  title: string,
  content: string,
  tag: string
): Promise<Note> => {
  const response = await noteServiceClient.post("/", { title, content, tag });
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await noteServiceClient.delete(`/${id}`);
  return response.data;
};
