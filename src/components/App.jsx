import React, { Component } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(prevState) {
    const contacts = this.state.contacts;
    const prevStateContacts = prevState.contacts;

    if (contacts !== prevStateContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  handleFormSubmit = data => {
    const checkName = this.state.contacts.find(element => element.name === data.name);
    checkName === undefined ? this.setState(prevState => ({ contacts: [data, ...prevState.contacts] })) : alert(`${data.name} is already in contacts.`);
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleFilter = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form onSubmit={this.handleFormSubmit} />
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList data={visibleFilter} onDelete={this.deleteContact} />
    </Container>
    );
  }
}

export default App;

const Title = styled.h1`
  font-size: 24px;
`;
