import { taskListVM } from '../../view-models/TaskListViewModel';
import { taskListView } from '../../views/TaskListView/TaskListView';

export default function NewTaskForm(): Node {
  const NEW_TASK_INPUT_ID: string = 'new-task-input';

  const newTaskForm: HTMLFormElement = document.createElement('form');
  newTaskForm.action = '';
  newTaskForm.classList.add('new-task-form');

  const newTaskInput: HTMLInputElement = document.createElement('input');
  newTaskInput.id = NEW_TASK_INPUT_ID;
  newTaskInput.type = 'text';
  newTaskInput.placeholder = 'Add new todo';

  const formSubmit: HTMLInputElement = document.createElement('input');
  formSubmit.classList.add('new-task-form');
  formSubmit.type = 'submit';
  formSubmit.value = 'Add new todo';

  function addNewTask(evt: any): void {
    evt.preventDefault();

    const newTaskForm: HTMLFormElement = evt.target as HTMLFormElement;
    const newTaskInput: HTMLInputElement = newTaskForm.querySelector(
      `#${NEW_TASK_INPUT_ID}`
    ) as HTMLInputElement;

    taskListVM.addTaskItem(newTaskInput.value);
    newTaskInput.value = '';
  }

  newTaskForm.append(newTaskInput, formSubmit);
  newTaskForm.addEventListener('submit', (evt: any): void => addNewTask(evt));

  return newTaskForm;
}
