import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
const Todolist = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/todos").then((res) => {
      res.json().then((data) => {
        setTodos(data);
        console.log(data);
      });
    });

    setInterval(() => {
      fetch("http://localhost:3000/todos").then((res) => {
        res.json().then((data) => {
          setTodos(data);
          console.log(data);
        });
      });
    }, 1000);
  }, []);
  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>ToDo List</h1>
      <div style={{}}>
        <ul style={{ listStyle: "none" }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                margin: "1em",
                background: "blue",
                padding: "0.5em",
                borderRadius: "0.5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: "2em",
                  fontFamily: "fantasy",
                  fontSize: "1.2em",
                  color: "wheat",
                }}
              >
                {todo.title}
              </span>
              <span
                style={{
                  marginRight: "2em",
                  fontFamily: "roboto",
                  fontSize: "0.8em",
                  color: "white",
                }}
              >
                {todo.description}
              </span>
              <Button
                variant="contained"
                href="#contained-buttons"
                size="small"
                onClick={() => {
                  fetch("http://localhost:3000/todos/" + todo._id, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then();
                }}
              >
                DELETE
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
