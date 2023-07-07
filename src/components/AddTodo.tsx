import React, { useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { IProps } from "./TodoList";

export const AddTodo = ({ restart, setRestart }: IProps) => {
  const [todoInput, setTodoInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      createdAt: String(Date.now()),
      id: nanoid(),
      todo: (e.currentTarget.elements.namedItem("todo") as HTMLInputElement)
        .value,
      done: false,
    };

    try {
      await axios.post(
        "https://64a7b8c5dca581464b84a70b.mockapi.io/api/todolist",
        dataToSend
      );
      setRestart(!restart);
      setTodoInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="p-4 text-center" onSubmit={(e) => void handleSubmit(e)}>
      <input
        className="border rounded-md border-slate-500 p-2"
        name="todo"
        type="text"
        value={todoInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodoInput(e.target.value)
        }
      />
      <button
        type="submit"
        className="p-2 ml-3 rounded-md border-spacing-1 bg-slate-500"
      >
        Add
      </button>
    </form>
  );
};
