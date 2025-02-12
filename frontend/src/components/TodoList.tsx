// src/components/TodoList.tsx

//contains React components that display data and handle user interactions (e.g., clicking buttons, submitting forms).
import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/todoService";
import { Todo } from "../types/todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!newTodo.title || !newTodo.description) return;
    await createTodo({ ...newTodo, completed: false });
    setNewTodo({ title: "", description: "" });
    loadTodos();
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    await updateTodo(id, { completed: !completed });
    loadTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <strong>{todo.title}</strong> - {todo.description}
            <button onClick={() => handleToggleComplete(todo.id, todo.completed)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
