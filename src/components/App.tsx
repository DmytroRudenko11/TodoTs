import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";

export const App = () => {
  const [restart, setRestart] = useState<boolean>(false);

  return (
    <>
      <TodoList setRestart={setRestart} restart={restart} />
      <AddTodo setRestart={setRestart} restart={restart} />
    </>
  );
};
