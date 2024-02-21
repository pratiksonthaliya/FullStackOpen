const Filter = ({ searchVal, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={searchVal} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
