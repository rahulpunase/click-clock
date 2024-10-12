import { useLocation, useParams } from "react-router-dom";

import TaskDetails from "@/common/components/tasks/TaskDetails";
import TaskDetailsAsModal from "@/common/components/tasks/TaskDetailsAsModal";

const TaskIdPage = () => {
  const location = useLocation();
  const params = useParams();
  const taskId = params?.taskId;
  if (location.state) {
    return <TaskDetailsAsModal taskId={taskId} />;
  }
  return <TaskDetails taskId={taskId} />;
};

export default TaskIdPage;
