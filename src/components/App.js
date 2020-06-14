import React, { Component } from "react";
import { uuid } from "uuidv4";
import { ToastContainer, toast } from "react-toastify";

import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ComtactList/ContactList";

import localStorageMethods from "../utils/localStorageMethods";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const storedTasks = localStorageMethods.get("contacts");

    if (storedTasks) {
      this.setState({
        contacts: storedTasks,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    localStorageMethods.save("contacts", contacts, prevState);
  }

  showNotification = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    if (contact.name === "") {
      this.showNotification("🦄 Please enter contact name");

      return;
    }
    if (contact.number === "") {
      this.showNotification("🦄 Please enter contact phone number");
      return;
    }

    const hasContact = this.state.contacts.some(
      (contact) => contact.name === name
    );

    hasContact
      ? this.showNotification(`${name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(filter);
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.addContact} />
        </Section>
        {contacts.length > 0 && (
          <Section title="Contacts">
            {contacts.length > 1 && (
              <Filter value={filter} onChangeFilter={this.handleFilter} />
            )}
            <ContactList
              contacts={filteredContacts}
              onClickDelete={this.deleteContact}
            />
          </Section>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
