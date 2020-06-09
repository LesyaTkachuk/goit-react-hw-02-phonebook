import React, { Component } from "react";
import styles from "./ContactForm.module.scss";
import PropTypes from "prop-types";

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    number: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state);

    this.setState({
      name: "",
      number: "",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Phone
          <input
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
