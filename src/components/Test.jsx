import React, { useState } from "react";
import createNewItem from "../utils/createNewItem";
import deleteItem from "../utils/deleteItem";

const Test = () => {
  const test = async () => {
    console.log(await deleteItem("4fdac60e-31ed-4a35-9266-ec97332136c1"));
  };
  return (
    <div>
      <button onClick={test}>aaaa</button>
    </div>
  );
};

export default Test;
