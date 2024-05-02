import React, { useState, useEffect, useRef } from "react";
import Input from "./input";
import Popup from "./filterPopUp";
import autocompleteContext from "./context";
import PropTypes from "prop-types";

const Autocomplete = ({
  placeholder,
  searchResults,
  onChange,
  onClear,
  onAddToList,
  displayKey,
  selectedSet,
  title,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(selectedSet);
  const [results, setResults] = useState([]);
  const [selectedStrArr, setSelectedStrArr] = useState([]);

  const [open, setOpen] = useState(false);
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      setOpen(true);
    } else {
      setOpen(false);
      setSelected([]);
      setResults([]);
      setLoaded(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && searchResults.length) {
      setSelectedStrArr(selectedSet.map((dataObj) => dataObj[displayKey]));
      setResults(searchResults);
    } else {
      setResults([]);
    }
    setLoaded(true);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [searchResults]);

  const onSearchChange = (data) => {
    if (!results.length) {
      setLoaded(false);
    }
    setSelected([]);
    if (!data) {
      setSearchTerm(data);
      return;
    }

    onChange(data);
    setSearchTerm(data);
  };

  const handleOnClear = () => {
    setSelected([]);
    onAddToList([]);
    onClear();
  };

  const handleAddToList = () => {
    onAddToList(selected);
    handleClose();
  };
  const handleSelectChange = (text, stat) => {
    if (stat && selected.indexOf(text) < 0) {
      selected.push(text);
    } else if (!stat) {
      const index = selected.indexOf(text);
      const _selected = [...selected];
      _selected.splice(index, 1);
      setSelected(_selected);
    }
  };

  return (
    <div ref={node} className="autocomplete-container">
      <autocompleteContext.Provider
        value={{
          searchTerm,
          onSearchChange,
          handleOnClear,
          handleSelectChange,
          handleAddToList,
          handleClose,
          open,
          selected,
          displayKey,
          title,
          selectedStrArr,
        }}
      >
        <Input placeholder={placeholder} disabled={disabled} />
        {open && dataLoaded && searchTerm && (
          <Popup list={results} noResults={dataLoaded && !results.length} />
        )}
      </autocompleteContext.Provider>
    </div>
  );
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onAddToList: PropTypes.func.isRequired,
  displayKey: PropTypes.string.isRequired,
  selectedSet: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

Autocomplete.defaultProps = {
  onClear() {},
};

export default Autocomplete;
