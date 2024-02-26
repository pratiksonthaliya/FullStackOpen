const Persons = ({ personToShow, deleteHandler }) => {
  return (
    <div>
      {personToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteHandler(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
