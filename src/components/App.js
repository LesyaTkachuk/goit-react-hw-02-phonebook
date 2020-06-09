import React, { Component } from "react";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import { uuid } from "uuidv4";
import Filter from "./Filter/Filter";
import ContactList from "./ComtactList/ContactList";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    if (contact.name === "") {
      alert("Please enter contact name");
      return;
    }
    if (contact.number === "") {
      alert("Please enter contact phone number");
      return;
    }

    const hasContact = this.state.contacts.some(
      (contact) => contact.name === name
    );

    hasContact
      ? alert(`${name} is already in contacts`)
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
      </>
    );
  }
}

export default App;
