import './new-task-form-style.css';
import NewTask from '../../interfaces/NewTask';
import { taskListVM } from '../../view-models/TaskListViewModel';

export default function NewTaskForm(): Node {
  const NEW_TASK_TITLE_ID: string = 'new-task-title';
  const NEW_TASK_NOTES_ID: string = 'new-task-notes';

  const title: HTMLHeadingElement = document.createElement('h1');
  title.textContent = 'Tasks';

  const newTaskForm: HTMLFormElement = document.createElement('form');
  newTaskForm.action = '';
  newTaskForm.classList.add('new-task-form');

  const titleInput: HTMLInputElement = document.createElement('input');
  titleInput.id = NEW_TASK_TITLE_ID;
  titleInput.type = 'text';
  titleInput.maxLength = 40;
  titleInput.placeholder = 'Add new task...';

  const rule: HTMLHRElement = document.createElement('hr');

  const notesInput: HTMLTextAreaElement = document.createElement('textarea');
  notesInput.id = NEW_TASK_NOTES_ID;
  notesInput.rows = 4;
  notesInput.maxLength = 1000;
  notesInput.placeholder = '(Optional) Add any notes to your task';

  const formSubmit: HTMLButtonElement = document.createElement('button');
  formSubmit.id = 'new-task-form-submit';
  formSubmit.type = 'submit';
  formSubmit.textContent = 'Add new todo';

  function sanitiseForm(
    titleInput: HTMLInputElement,
    notesInput: HTMLInputElement
  ): NewTask {
    const sanitisedTitle: string = titleInput.value.trim();
    const sanitisedNotes: string = notesInput.value.trim();

    return {
      title: sanitisedTitle,
      notes: sanitisedNotes,
    };
  }

  function validateForm({ title }: NewTask): boolean {
    return !!title;
  }

  function handleFormErrors(titleInput: HTMLInputElement) {
    titleInput.classList.add('error');
  }

  function resetForm({ titleInput, notesInput }: any) {
    titleInput.value = '';
    notesInput.value = '';
    titleInput.classList.remove('error');
  }

  function addNewTask(evt: any): void {
    evt.preventDefault();

    const newTaskForm: HTMLFormElement = evt.target as HTMLFormElement;
    const titleInput: HTMLInputElement = newTaskForm.querySelector(
      `#${NEW_TASK_TITLE_ID}`
    ) as HTMLInputElement;

    const notesInput: HTMLInputElement = newTaskForm.querySelector(
      `#${NEW_TASK_NOTES_ID}`
    ) as HTMLInputElement;

    const sanitisedForm: NewTask = sanitiseForm(titleInput, notesInput);
    const isValid: boolean = validateForm(sanitisedForm);

    if (isValid) {
      taskListVM.addTaskItem(sanitisedForm);
      resetForm({ titleInput, notesInput });
    }

    if (!isValid) handleFormErrors(titleInput);
  }

  newTaskForm.append(title, titleInput, rule, notesInput, formSubmit);
  newTaskForm.addEventListener('submit', (evt: any): void => addNewTask(evt));

  return newTaskForm;
}
