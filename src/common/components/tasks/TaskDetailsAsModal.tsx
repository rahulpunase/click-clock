import { useNavigate } from "react-router-dom";

import { Dialog } from "@/design-system/ui/Dialog/Dialog";

import TaskDetails from "@/common/components/tasks/TaskDetails";

const TaskDetailsAsModal = ({ taskId }: { taskId: string | undefined }) => {
  const navigate = useNavigate();
  return (
    <Dialog open onOpenChange={() => navigate(-1)}>
      <Dialog.Content className="p-0 w-full border-0" size="xl">
        <Dialog.Content.Main className="p-0">
          <TaskDetails taskId={taskId} />
        </Dialog.Content.Main>
      </Dialog.Content>
    </Dialog>
  );
};

export default TaskDetailsAsModal;
