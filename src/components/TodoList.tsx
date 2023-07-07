import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
export interface ITodoList {
  createdAt: string;
  done: boolean;
  id: string;
  todo: string;
}

export interface IProps {
  restart: boolean;
  setRestart: React.Dispatch<SetStateAction<boolean>>;
}

export const TodoList = ({ restart, setRestart }: IProps) => {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async (): Promise<void> => {
      try {
        const response = await axios.get<ITodoList[]>(
          "https://64a7b8c5dca581464b84a70b.mockapi.io/api/todolist"
        );
        const data = response.data;
        setTodoList(data);
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [restart]);

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(
        `https://64a7b8c5dca581464b84a70b.mockapi.io/api/todolist/${id}`
      );
      setRestart(!restart);
      console.log("removed");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-7 text-center">
      <ul className="flex flex-col gap-2 w-30">
        {todoList.map((item) => (
          <li key={item.id} className="border">
            {item.todo}
            <button
              className="p-2 ml-5 rounded-md border-spacing-1 bg-red-500"
              type="button"
              onClick={() => void handleDeleteTodo(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
