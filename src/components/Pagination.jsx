// const [currentPage, setCurrentPage] = useState(1);

// const dpp = 12
// const indexOfLastExercise = currentPage * dpp;
// const indexOfFirstExercise = indexOfLastExercise - dpp;
// const currentExercises = filteredExercises.slice(
//   indexOfFirstExercise,
//   indexOfLastExercise
// );
// const paginate = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };
// <Pagination
// totalDisplay={filteredExercises.length}
// displaysPerPage={dpp}
// paginate={paginate}
// currentPage={currentPage}
// />

const Pagination = ({
  displaysPerPage,
  totalDisplay,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDisplay / displaysPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{
                borderColor: currentPage === number ? "red" : "",
                width: "60px",
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
