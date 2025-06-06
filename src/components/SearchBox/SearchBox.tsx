// текстове поле для пошуку по колекції
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const [debounceValue] = useDebounce(inputValue, 1000);

  useEffect(() => {
    onSearch(debounceValue.trim());
  }, [debounceValue, onSearch]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}
