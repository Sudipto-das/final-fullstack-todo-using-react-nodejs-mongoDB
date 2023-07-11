import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
const Addtodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = () => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
  };

  return (
    <div
      style={{
        backgroundColor: "blue",
        width: "30%",
        padding: "5em",
        height: "100vh",
      }}
    >
      <h1>Add Todo</h1>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="description"
        variant="outlined"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <br />
      <Button variant="contained" href="#contained-buttons" onClick={addTodo}>
        Add
      </Button>
    </div>
  );
};
export default Addtodo;
