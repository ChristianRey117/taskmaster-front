import Login from "~/components/Login/login";
import type { Route } from "./+types/login.page";
import { Grid } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LoginPage() {
  return (
    <Grid container size={12} justifyContent={"center"} paddingTop={"10%"}>
      <Login></Login>
    </Grid>
  );
}
