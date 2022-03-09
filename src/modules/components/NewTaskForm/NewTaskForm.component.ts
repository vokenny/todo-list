import { taskListVM } from '../../view-models/TaskListViewModel';

export default function NewTaskForm(): Node {
  const NEW_TASK_INPUT_ID: string = 'new-task-input';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.textContent = 'Tasks';

  const newTaskForm: HTMLFormElement = document.createElement('form');
  newTaskForm.action = '';
  newTaskForm.classList.add('new-task-form');

  const newTaskTitleInput: HTMLInputElement = document.createElement('input');
  newTaskTitleInput.id = NEW_TASK_INPUT_ID;
  newTaskTitleInput.type = 'text';
  newTaskTitleInput.placeholder = 'Add new task...';

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

  newTaskForm.append(title, newTaskTitleInput, formSubmit);
  newTaskForm.addEventListener('submit', (evt: any): void => addNewTask(evt));

  return newTaskForm;
}
