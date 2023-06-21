import React, { useState } from "react";

const Test = () => {
  const test = async () => {
    console.log("hello");
  };
  return (
    <div>
      <button onClick={test}>aaaa</button>
    </div>
  );
};

export default Test;
