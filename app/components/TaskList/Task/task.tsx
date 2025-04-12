import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { useEffect } from "react";
import type { ITask } from "~/intefaces/ITaskResponse";

export default function Task(task: ITask) {
  useEffect(() => {}, []);
  return (
    <>
      <Card>
        <CardHeader title={task.title}></CardHeader>
        <CardContent>
          <Grid container>
            <Grid size={12} padding={"0 1rem"}>
              <small>{task.description}</small>
            </Grid>
            <Grid size={12} padding={"0 1rem"}>
              <p>{task.state}</p>
            </Grid>

            <Grid size={6} offset={6}>
              <Grid container>
                <Grid size={6}>
                  <Button>Edit</Button>
                </Grid>

                <Grid size={6}>
                  <Button>Delete</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
