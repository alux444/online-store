import React, { useState } from "react";
import createNewItem from "../utils/createNewItem";
import deleteItem from "../utils/deleteItem";
import updateItem from "../utils/updateItem";

const Test = () => {
  const test = async () => {
    console.log(
      await updateItem("863d2273-784f-4a08-8bd6-1da968df0c26", {
        clearance: true,
        description: "edited description is crazy",
      })
    );
  };
  return (
    <div>
      <button onClick={test}>aaaa</button>
    </div>
  );
};

export default Test;
