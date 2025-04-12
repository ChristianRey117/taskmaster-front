import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { ITask, ITaskResponse } from "~/intefaces/ITaskResponse";
import Task from "./Task/task";

export default function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [statusTask, setStatusTask] = useState<
    "TODO" | "DOING" | "DONE" | null
  >(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3000/task")
      .then((res) => res.json())
      .then((data: ITaskResponse) => {
        setTasks(data.data);
      });
  };
  return (
    <Grid container padding={"2rem"}>
      <Grid size={12}>
        <h1>Tasks</h1>
      </Grid>

      <Grid container size={12}>
        <Grid size={6}>
          <p>Filter</p>
        </Grid>
        <Grid size={6}>
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
  );
}
