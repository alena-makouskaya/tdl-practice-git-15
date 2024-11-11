import { TaskPriorities, TaskStatuses } from "../../../common/enums/enums";

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
  
  export type GetTasksResponse = {
    items: Array<TaskType>;
    totalCount: number;
    error: string | null
  };
  
  export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: number;
    priority?: number;
    startDate?: string;
    deadline?: string;
  };