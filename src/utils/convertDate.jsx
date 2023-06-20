const convertDate = (seconds) => {
  const newDate = new Date(seconds * 1000);

  return newDate.toLocaleDateString();
};

export default convertDate;
