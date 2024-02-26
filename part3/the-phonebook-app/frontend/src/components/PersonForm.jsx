const PersonForm = ({
  addNumber,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
