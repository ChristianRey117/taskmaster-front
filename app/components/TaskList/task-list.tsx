import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ITask, ITaskResponse } from "~/intefaces/ITaskResponse";
import Task from "./Task/task";

import {
  addTask,
  updateTask,
  deleteTask,
} from "../../redux/task-reducer/task-reducer";
import { useDispatch } from "react-redux";
import { get, post } from "../../interceptor/interceptor";

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [statusTask, setStatusTask] = useState<
    "TODO" | "DOING" | "DONE" | null
  >(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    state: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    get("/task", {}).then((res) => {
      if (res.data) {
        setTasks(res.data);
      }
    });
  };

  const saveData = () => {
    post("/task", newTask, {}).then((res) => {
      window.location.reload();
    });
  };
  return (
    <>
      <Dialog open={openDialog}>
        <DialogTitle>Form to add new task</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid size={12} padding={"2rem"}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Title Task"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewTask({ ...newTask, title: e.target.value });
                }}
              />
            </Grid>

            <Grid size={12} padding={"2rem"}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description Task"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setNewTask({ ...newTask, description: e.target.value });
                }}
              />
            </Grid>

            <Grid size={12} padding={"2rem"}>
              <Autocomplete
                disablePortal
                options={["TODO", "DOING", "DONE"]}
                sx={{ width: 300 }}
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    state: e.currentTarget.textContent as string,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="State Task" />
                )}
              />
            </Grid>

            <Grid container size={6} offset={6}>
              <Grid size={6}>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
              </Grid>

              <Grid size={6}>
                <Button color="primary" onClick={saveData}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid container padding={"2rem"}>
        <Grid size={12} padding={"2rem"}>
          <h1>Tasks</h1>
        </Grid>

        <Grid container size={12}>
          <Grid size={3} paddingLeft={"2rem"}>
            <Button onClick={() => setOpenDialog(true)}>New task</Button>
          </Grid>
          <Grid size={3} paddingLeft={"2rem"}>
            <p>Filter</p>
          </Grid>
          <Grid
            size={6}
            justifyContent={"end"}
            display={"flex"}
            paddingRight={"2rem"}
          >
            <Autocomplete
              disablePortal
              options={["TODO", "DOING", "DONE"]}
              sx={{ width: 300 }}
              onChange={(e) => {
                setStatusTask(
                  e.currentTarget.textContent as "TODO" | "DONE" | "DOING"
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="State Task" />
              )}
            />
          </Grid>
        </Grid>
        {tasks.map((task) => {
          dispatch(addTask({ ...task }));
          if (statusTask) {
            if (statusTask == task.state) {
              return (
                <Grid
                  size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
                  padding={"2rem"}
                  rowSpacing={3}
                  key={task.id}
                >
                  <Task
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    state={task.state}
                    title={task.title}
                  ></Task>
                </Grid>
              );
            }
            return;
          }
          return (
            <Grid
              size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
              padding={"2rem"}
              rowSpacing={3}
              key={task.id}
            >
              <Task
                key={task.id}
                id={task.id}
                description={task.description}
                state={task.state}
                title={task.title}
              ></Task>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
