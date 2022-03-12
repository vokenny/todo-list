import './new-task-form-style.css';
import NewTask from '../../interfaces/NewTask';
import { taskListVM } from '../../view-models/TaskListViewModel';
import { FormValidator, InputValidator } from '../../interfaces/FormValidator';

export default function NewTaskForm(): Node {
  const NEW_TASK_TITLE_ID: string = 'new-task-title';
  const NEW_TASK_NOTES_ID: string = 'new-task-notes';
  const NEW_TASK_DATE_ID: string = 'new-task-date';

  const titleInputSelector = () =>
    document.querySelector(`#${NEW_TASK_TITLE_ID}`) as HTMLInputElement;
  const notesInputSelector = () =>
    document.querySelector(`#${NEW_TASK_NOTES_ID}`) as HTMLInputElement;
  const dueDateInputSelector = () =>
    document.querySelector(`#${NEW_TASK_DATE_ID}`) as HTMLInputElement;

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
  notesInput.rows = 2;
  notesInput.maxLength = 1000;
  notesInput.placeholder = '(Optional) Add any notes to your task';

  const dueDateInput: HTMLInputElement = document.createElement('input');
  dueDateInput.id = NEW_TASK_DATE_ID;
  dueDateInput.type = 'date';

  const formSubmit: HTMLButtonElement = document.createElement('button');
  formSubmit.id = 'new-task-form-submit';
  formSubmit.type = 'submit';
  formSubmit.textContent = 'Add new todo';

  function sanitiseForm(): NewTask {
    const sanitisedTitle: string = titleInputSelector().value.trim();
    const sanitisedNotes: string = notesInputSelector().value.trim();
    const sanitisedDueDate: string = dueDateInputSelector().value;

    return {
      title: sanitisedTitle,
      notes: sanitisedNotes,
      dueDate: sanitisedDueDate,
    };
  }

  function validateForm({ title, dueDate }: NewTask): FormValidator {
    let isValidDueDate: boolean = true; // by default it's not mandatory

    if (dueDate) {
      const today: string = new Date().toISOString().split('T')[0];
      const dueDateFormatted: string = new Date(dueDate)
        .toISOString()
        .split('T')[0];

      isValidDueDate = dueDateFormatted >= today;
    }

    return {
      titleInput: {
        field: titleInputSelector(),
        isValid: !!title,
      },
      dueDateInput: {
        field: dueDateInputSelector(),
        isValid: isValidDueDate,
      },
    };
  }

  function handleFormErrors(formValidator: FormValidator) {
    Object.values(formValidator).forEach(
      ({ field, isValid }: InputValidator) => {
        if (!isValid) field.classList.add('error');
      }
    );
  }

  function resetFormFields(): void {
    [titleInputSelector, notesInputSelector, dueDateInputSelector].forEach(
      (selector) => (selector().value = '')
    );
  }

  function resetErrorStyling(): void {
    titleInputSelector().classList.remove('error');
    dueDateInputSelector().classList.remove('error');
  }

  function resetForm(): void {
    resetFormFields();
    resetErrorStyling();
  }

  function addNewTask(evt: any): void {
    evt.preventDefault();

    resetErrorStyling();

    const sanitisedForm: NewTask = sanitiseForm();
    const formValidator: FormValidator = validateForm(sanitisedForm);

    if (
      Object.values(formValidator).every(
        ({ isValid }: InputValidator) => isValid
      )
    ) {
      taskListVM.addTaskItem(sanitisedForm);
      resetForm();
    } else {
      handleFormErrors(formValidator);
      resetFormFields();
    }
  }

  newTaskForm.append(
    title,
    titleInput,
    rule,
    notesInput,
    dueDateInput,
    formSubmit
  );
  newTaskForm.addEventListener('submit', (evt: any): void => addNewTask(evt));

  return newTaskForm;
}
