import React, { useContext, useState, useEffect, useRef } from "react";
import autocompleteContext from "./context";
import PropTypes from "prop-types";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Input = ({ placeholder, disabled }) => {
  const inputRef = useRef();
  const autocomplete = useContext(autocompleteContext);
  const openStat = autocomplete.open;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const _prev = usePrevious(searchTerm);
  useEffect(() => {
    if (openStat && debouncedSearchTerm) {
      autocomplete.onSearchChange(debouncedSearchTerm);
    }

    if (!inputRef.current.value && _prev === "") {
      autocomplete.onSearchChange("");
    }
    if (!openStat && !!_prev) {
      inputRef.current.value = "";
      setSearchTerm("");
    }
  }, [debouncedSearchTerm, openStat]);
  return (
    <span className="search-field-wrap">
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className="icon--search_flat"></span>
    </span>
  );
};
Input.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
