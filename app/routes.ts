import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.page.tsx"),
  route("/tasks", "./routes/task-page/task.page.tsx"),
] satisfies RouteConfig;
