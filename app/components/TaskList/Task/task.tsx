import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { ITask, ITaskResponse } from "~/intefaces/ITaskResponse";
import "./task.css";
export default function Task(task: ITask) {
  const [statusTask, setStatusTask] = useState<
    "TODO" | "DOING" | "DONE" | null
  >(null);

  const [isClickDescription, setIsClickDescription] = useState(false);
  const [newDescription, setNewDescription] = useState<string | null>(null);

  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  useEffect(() => {}, []);

  const sendData = () => {
    setIsLoadingEdit(true);
    const request = {
      ...task,
      title: task.title,
      description: newDescription ?? task.description,
      state: statusTask ?? task.state,
    } as ITask;
    fetch("http://localhost:3000/task/" + task.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((data: ITaskResponse) => {
        setIsLoadingEdit(false);

        window.location.reload();
      });
  };

  const deleteData = () => {
    setIsLoadingDelete(true);
    fetch("http://localhost:3000/task/" + task.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ITaskResponse) => {
        setIsLoadingDelete(false);
        window.location.reload();
      });
  };
  return (
    <>
      <Card>
        <CardHeader title={task.title}></CardHeader>
        <CardContent>
          <Grid container>
            <Grid size={12} padding={"0 1rem"}>
              {isClickDescription ? (
                <>
                  <Input
                    placeholder="New description"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setNewDescription(e.target.value);
                      task.description = e.target.value;
                    }}
                  ></Input>

                  <Button
                    onClick={() => {
                      setIsClickDescription(false);
                    }}
                  >
                    Done
                  </Button>
                </>
              ) : (
                <div
                  className="input-click"
                  onClick={() => {
                    setIsClickDescription(true);
                  }}
                >
                  <small>
                    {newDescription ? newDescription : task.description}
                  </small>
                </div>
              )}
            </Grid>
            <Grid size={12} padding={"1rem 1rem"}>
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
                  <TextField
                    {...params}
                    label={"Actual state: " + task.state}
                  />
                )}
              />
            </Grid>

            <Grid size={6} offset={6}>
              <Grid container>
                <Grid size={6}>
                  <Button loading={isLoadingEdit} onClick={sendData}>
                    Edit
                  </Button>
                </Grid>

                <Grid size={6}>
                  <Button
                    variant="contained"
                    color="error"
                    loading={isLoadingDelete}
                    onClick={deleteData}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
