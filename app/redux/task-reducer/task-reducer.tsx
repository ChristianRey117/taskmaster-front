// store/tasksSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { post, get, put, del } from "../../interceptor/interceptor";
// Define la interfaz para una tarea
export interface Task {
  id?: number;
  title: string;
  description: string;
  state: "TODO" | "DOING" | "DONE";
}

// Define el estado inicial
interface TasksState {
  list: Task[];
}

const initialState: TasksState = {
  list: [],
};

// Crea el slice de tareas
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.list.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      put("/task/" + action.payload.id, action.payload, {}).then((res) => {
        window.location.reload();
      });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      del("/task/" + action.payload, {}).then((res) => {
        window.location.reload();
      });
    },
  },
});

// Exporta las acciones
export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

// Exporta el reducer
export default tasksSlice.reducer;
