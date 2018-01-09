import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856", display: "block", margin: "0 0 10px 0" }}>
    {text}
  </span>
);

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
