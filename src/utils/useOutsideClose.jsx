import { useEffect } from "react";

const useOutsideClick = (ref, closeFunction) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeFunction();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      console.log("removeed");
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, closeFunction]);

  return ref;
};

export default useOutsideClick;
