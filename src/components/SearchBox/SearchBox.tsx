// текстове поле для пошуку по колекції
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";
import toast from "react-hot-toast";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue] = useDebounce(inputValue, 1000);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmed = debounceValue.trim();
    onSearch(trimmed);

    if (trimmed === "" && inputValue !== "") {
      setError("Try it once");
      toast.error("Try it once");
      return;
    } else {
      setError("");
    }
  }, [debounceValue, onSearch, inputValue]);

  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      {error && <p className={css.error}>{error}</p>}
    </>
  );
}
