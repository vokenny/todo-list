import { taskListVM } from '../../view-models/TaskListViewModel';
import NewTaskForm from '../NewTaskForm/NewTaskForm.component';

export default function TaskControls(): Node {
  const controls: HTMLDivElement = document.createElement('div');
  const newTaskForm: Node = NewTaskForm();

  const deleteAllTasksBtn: HTMLButtonElement = document.createElement('button');
  deleteAllTasksBtn.id = 'delete-all-tasks';
  deleteAllTasksBtn.textContent = 'Delete all tasks';

  deleteAllTasksBtn.addEventListener('click', (): void => {
    taskListVM.deleteAllTaskItems();
    taskListVM.updateTaskList();
  });

  controls.append(newTaskForm, deleteAllTasksBtn);
  return controls;
}
