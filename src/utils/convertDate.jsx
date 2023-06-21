const convertDate = (time) => {
  const newDate = new Date(time.seconds * 1000);

  return newDate.toLocaleDateString();
};

export default convertDate;
