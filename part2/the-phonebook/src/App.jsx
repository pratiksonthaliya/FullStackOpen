import { useState } from "react";
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
  const addNumber = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    const name = event.target.value;

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === name) {
        alert(`${name} is already added to phonebook`);
        return;
      }
    }

    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

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

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input value={searchValue} onChange={handleFilter} />
      </div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <br />

        <div>
          <button type="submit" onClick={addNumber}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personToShow.map((person, id) => (
          <div key={id}>
            <p>
              {person.name} {person.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
