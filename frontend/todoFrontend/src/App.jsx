import { useEffect, useState } from "react";

import "./App.css";
import Todolist from "./Todolist";
import Addtodo from "./Addtodo";

const App = () => {
  return (
    <>
      <div style={{ display: "flex" ,justifyContent:'space-around'}}>
        <Addtodo></Addtodo>
        <Todolist></Todolist>
      </div>
    </>
  );
};

export default App;
