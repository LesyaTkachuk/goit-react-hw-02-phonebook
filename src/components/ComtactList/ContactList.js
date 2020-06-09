import React from "react";
import styles from "./ContactList.module.scss";
import PropTypes from "prop-types";

function ContactList({ contacts, onClickDelete }) {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.item}>
          <span className={styles.name}>{name}: </span>
          <span>{number}</span>
          <button type="button" onClick={() => onClickDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default ContactList;
