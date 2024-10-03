import {React, useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo("");
    saveToLS()
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };
  const handleCheckbox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };

  const handleEdit = (e, id) => {
    let index = todos.findIndex((item) => {
      return id === item.id;
    });
    setTodo(todos[index].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS()
  };

  return (
    <>
      <div className="overflow-hidden  bg-gradient-to-r font-lexend from-cyan-500 to-blue-500 flex justify-start flex-col h-full w-full min-h-screen text-white ">
        <h2 className="text-5xl p-10 flex justify-center font-bold">TASKIFY</h2>
        <div className="input flex flex-row justify-center">
          <input
            placeholder="Add Task"
            onChange={handleChange}
            value={todo}
            type="text"
            className="h-12 w-64 px-4 bg-gray-500 rounded-3xl lg:h-10 lg:w-80 focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleAdd}
            className=" bg-blue-400 hover:bg-blue-300 mx-2 px-2 rounded-3xl focus:outline-none focus:ring-0"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center text-2xl mt-12 mb-4">
          Your Tasks
        </div>
        <div className="todos flex flex-col justify-center items-center">
          {todos.length === 0 && (
            <div className="flex justify-center items-center">
              No Todos to display
            </div>
          )}
          {todos.map((item) => (
            <div
              key={item.id}
              className=" w-5/6 flex flew-row justify-start items-center my-2 lg:w-2/5 bg-gray-500 py-2.5 rounded-3xl relative"
            >
              <div className="flex  items-center">
                <input
                  checked={item.isCompleted}
                  id={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  className="appearance-none z-10 cursor-pointer mx-4 mt-0.5 h-6 w-6 rounded-xl border-2 border-gray-300"
              
                />

                {item.isCompleted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white absolute translate-x-5 translate-y-0.5 z-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}

                <div className="">
                  <div
                    className={`${
                      item.isCompleted ? "line-through  text-gray-300" : ""
                    } w-48 lg:w-96 text-xl break-words`}
                  >
                    {item.todo}
                  </div>
                </div>
              </div>
              <div className="flex absolute right-0">
                <button
                  onClick={(e) => {
                    handleEdit(e, item.id);
                  }}
                  className="hover:bg-gray-400 text-xl  px-2 h-9 w-9 rounded-3xl"
                >
                  <BiEditAlt />
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className=" hover:bg-gray-400 mx-1 px-2.5 h-9 w-9 rounded-3xl"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
