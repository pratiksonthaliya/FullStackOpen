const Persons = ({ personToShow }) => {
  return (
    <div>
      {personToShow.map((person, id) => (
        <div key={id}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
