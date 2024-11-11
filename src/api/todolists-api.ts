import axios from "axios";
import { TaskPriorities, TaskStatuses } from "../common/enums/enums";
import { instance } from "../common/instance/instance";
import { BaseResponce } from "../common/types/types";



export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<BaseResponce<{ item: TodolistType }>>(`todo-lists`, {
      title,
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponce>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponce>(`todo-lists/${todolistId}`, { title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTodolistsType>(`todo-lists/${todolistId}/tasks`);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponce<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  delteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponce>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponce>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};

// types

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};


export type GetTodolistsType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string;
};

export type TaskType = {
  todoListId: string;
  id: string;
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
