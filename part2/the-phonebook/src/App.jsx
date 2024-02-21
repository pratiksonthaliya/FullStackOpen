import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: "Pratik Sonthaliya", number: "123456789" },
    { name: "Adarsh Kumar", number: "987654321" },
    { name: "Vikash Kumar", number: "567891234" },
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
  ]);

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
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }

    setPersons(persons.concat(newObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
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
      <Persons personToShow={personToShow} />
    </div>
  );
}

export default App;
