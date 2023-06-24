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
    <div className="mt-3">
      <ul className="flex align-center justify-center items-center flex-wrap">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{
                borderColor: currentPage === number ? "blue" : "",
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

export default Pagination;
