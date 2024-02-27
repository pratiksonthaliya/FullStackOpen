/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import personService from "./services/persons";

let global = 10;

function App() {
  // const [persons, setPersons] = useState([
  //   { name: "Pratik Sonthaliya", number: "123456789" },
  //   { name: "Adarsh Kumar", number: "987654321" },
  //   { name: "Vikash Kumar", number: "567891234" },
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  // ]);

  const [persons, setPersons] = useState([]);
  const [newMembMessage, setNewMembMessage] = useState(null);
  const [newErrorMessage, setNewErrorMessage] = useState(null);

  useState(() => {
    personService.getAll().then((initialPersons) => {
      // console.log(res.data);
      setPersons(initialPersons);
    });
  }, [persons]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [newPhonebook, setNewPhoneBook] = useState([]);

  const handleFilter = (event) => {
    // event.preventDefault();
    const searchVal = event.target.value;
    console.log(searchVal.toLowerCase());
    setSearchValue(searchVal);
    const newVal = persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchVal)
    );
    setNewPhoneBook(newVal);
  };

  const personToShow = searchValue !== "" ? newPhonebook : persons;

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const addNumber = (event) => {
    global = global + 1;
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
      id: `${global}`,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        // alert(`${newName} is already added to phonebook`);
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with new one`
          )
        ) {
          personService
          .update(newObject).then((response) => {
              // console.log(response);
              const personsNew = persons.filter(
                (person) => person.name !== newName
              );
              setPersons(personsNew.concat(newObject));
              setNewMembMessage(`Added ${newObject.name}`);
            })
            .catch((error) => {
              setNewErrorMessage(
                `Information of ${newObject.name} has already been removed from the server`
              );
            });
        }
        return;
      }
    }

    personService
      .create(newObject)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewMembMessage(`Added ${newPerson.name}`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNewErrorMessage(
          `Information of ${newObject.name} has already been removed from the server`
        );
      });
  };

  const deleteHandler = (id) => {
    const personToDel = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDel.name}`)) {
      personService.remove(id).then(() => {
        setPersons(persons => persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <Notification message={newMembMessage} />
      <ErrorMessage message={newErrorMessage} />
      <h1>Phonebook</h1>
      <Filter searchVal={searchValue} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        addNumber={addNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deleteHandler={deleteHandler} />
    </div>
  );
}

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="newMemb">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default App;
