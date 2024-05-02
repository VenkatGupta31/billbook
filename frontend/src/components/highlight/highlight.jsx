import React from "react";
const escapeRegExp = (str = "") =>
  str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

const Highlight = ({ search = "", children = "" }) => {
  const patt = new RegExp(
    `(${escapeRegExp(search).replace(/\s+/g, " ").trim().replace(/ /g, "|")})`,
    "i"
  );
  const parts = String(children).split(patt);

  if (search) {
    return parts.map((part, index) =>
      patt.test(part) ? <b key={index}>{part}</b> : part
    );
  } else {
    return children;
  }
};

export default Highlight;
