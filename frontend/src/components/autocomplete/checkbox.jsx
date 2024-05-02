import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const CheckboxItem = ({ isChecked, text }) => {
  return (
    <React.Fragment>
      <span className={classNames("checkbox", { checked: isChecked })} />
      <span className="text"> {text}</span>
    </React.Fragment>
  );
};

CheckboxItem.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  postfixComponent: PropTypes.element,
};

export default CheckboxItem;
