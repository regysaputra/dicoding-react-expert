import React from "react";

function useInput() {
  const [value, setValue] = React.useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue("");
  }

  return [value, handleChange, reset];
}

export default useInput;
