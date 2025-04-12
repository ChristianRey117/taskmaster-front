import { Provider } from "react-redux";
import TaskList from "~/components/TaskList/task-list";
import store from "~/redux/store";

export default function TaskPage() {
  return (
    <Provider store={store}>
      <TaskList></TaskList>
    </Provider>
  );
}
