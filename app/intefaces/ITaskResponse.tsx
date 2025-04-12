export interface ITaskResponse {
  success: boolean;
  error: null | { message: string };
  data: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  state: "TODO" | "DOING" | "DONE";
}
