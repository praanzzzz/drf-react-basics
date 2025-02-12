// src/types/todo.ts
//stores TypeScript interfaces that define the shape of the data we expect 
//from the backend. This ensures type safety across our application.
export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
