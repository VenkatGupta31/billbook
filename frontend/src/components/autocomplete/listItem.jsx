import React, { useState, useContext, useEffect } from "react";
import autocompleteContext from "./context";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckboxItem from "./checkbox";
import Highlight from "../highlight/highlight";

const ListItem = ({ textObj }) => {
  const autocomplete = useContext(autocompleteContext);
  const listOfSelected = autocomplete.selected.map(
    (obj) => obj[autocomplete.displayKey]
  );
  const isDisable =
    autocomplete.selectedStrArr.indexOf(textObj[autocomplete.displayKey]) > -1;
  const hasNoPerformanceData = textObj.hasPerformance === false;
  const [checkState, onToggle] = useState(false);

  useEffect(() => {
    if (listOfSelected.indexOf(textObj[autocomplete.displayKey]) > -1) {
      onToggle(true);
    } else {
      onToggle(false);
    }
  }, [autocomplete.displayKey, listOfSelected, textObj]);

  return (
    <div
      title={textObj[autocomplete.displayKey]}
      className={classNames("autocomplete-item", {
        disabled: isDisable,
        hasNoPerformanceData: hasNoPerformanceData,
      })}
      onClick={() => {
        !hasNoPerformanceData &&
          !isDisable &&
          autocomplete.handleSelectChange(textObj, !checkState);
        !hasNoPerformanceData && !isDisable && onToggle(!checkState);
      }}
    >
      <CheckboxItem
        isChecked={isDisable ? true : checkState}
        text={
          <Highlight search={autocomplete.searchTerm}>
            {textObj[autocomplete.displayKey]}
          </Highlight>
        }
      />
      {hasNoPerformanceData && (
        <span className={classNames("noPerformanceDataLabel")}>
          No Performance
        </span>
      )}
    </div>
  );
};

ListItem.propTypes = {
  textObj: PropTypes.object,
};

export default ListItem;
