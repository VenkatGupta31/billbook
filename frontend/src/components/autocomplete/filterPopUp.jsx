import React, { useContext, useRef, useEffect } from "react";
import ListItem from "./listItem";
import autocompleteContext from "./context";
import PropTypes from "prop-types";

const Popup = ({ list, noResults }) => {
  const autocomplete = useContext(autocompleteContext);
  const popupRef = useRef();

  useEffect(() => {
    if (
      popupRef.current.parentNode.getBoundingClientRect().top +
        popupRef.current.getBoundingClientRect().height >
      window.innerHeight
    ) {
      popupRef.current.setAttribute(
        "style",
        `top:-${popupRef.current.getBoundingClientRect().height + 10}px`
      );
    }
    return () => {
      popupRef.current?.removeAttribute("style");
    };
  });

  return noResults ? (
    <div className="autocomplete-popup" ref={popupRef}>
      <div className="autocomplete-popup-wrap">
        <p>No results found</p>
      </div>
      <div className="autocomplete-actions">
        <button
          className="no-result"
          onClick={() => autocomplete.handleClose()}
        >
          Done
        </button>
      </div>
    </div>
  ) : (
    <div className="autocomplete-popup" ref={popupRef}>
      <div className="autocomplete-popup-wrap">
        {autocomplete.title && (
          <h4 className="autocomplete-popup-title">{autocomplete.title}</h4>
        )}
        {list.map((dataText, index) => (
          <ListItem key={index} textObj={dataText} />
        ))}
      </div>
      <div className="autocomplete-actions">
        <button className="left" onClick={() => autocomplete.handleOnClear()}>
          Clear
        </button>
        <button
          className="right"
          onClick={() => autocomplete.handleAddToList()}
        >
          Add to list
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  list: PropTypes.array,
  noResults: PropTypes.bool,
};

Popup.defaultProps = {
  type: null,
  noResults: false,
};

export default Popup;
