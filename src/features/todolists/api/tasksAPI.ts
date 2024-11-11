import { instance } from "../../../common/instance/instance";
import { BaseResponce } from "../../../common/types/types";
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "./tasksAPI.types";

export const tasksAPI = {

    getTasks(todolistId: string) {
      return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
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