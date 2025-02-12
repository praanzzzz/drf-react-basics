// src/services/todoService.ts

// contains functions for making API requests to the Django backend using Axios. Instead of writing fetch logic 
// inside components, we separate them here for better maintainability and reusability.
import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://127.0.0.1:8000/api/todos/";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (todo: Omit<Todo, "id">) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
  const response = await axios.patch(`${API_URL}${id}/`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`);
};
