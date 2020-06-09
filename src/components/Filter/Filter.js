import React from "react";
import styles from "./Filter.module.scss";
import PropTypes from "prop-types";

function Filter({ value, onChangeFilter }) {
  return (
    <label className={styles.label}>
      Find contact by name
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
        className={styles.input}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
