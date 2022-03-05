import Task from '../../components/TaskItem/Task.component';
import TaskItem from '../../models/TaskItem';
import { taskListVM } from '../../view-models/TaskListViewModel';

export default class TaskListView {
  /*
  Used for taking the data returned from TaskListViewModel, and representing it on the browser.
  */

  #NEW_TASK_INPUT_ID: string = 'new-task-input';

  get #displayedTaskElems(): HTMLElement[] {
    return Array.from(document.querySelectorAll('.task')) as HTMLElement[];
  }

  get #displayedTaskIDs(): string[] {
    return this.#displayedTaskElems.map(
      (task: HTMLElement): string => task.dataset.id ?? ''
    );
  }

  get #taskList(): HTMLMenuElement {
    const maybeMenuElem: Element | null = document.querySelector('.task-list');
    const menuElem: HTMLMenuElement = maybeMenuElem
      ? (maybeMenuElem as HTMLMenuElement)
      : this.#createTaskList();

    return menuElem;
  }

  #createTaskList(): HTMLMenuElement {
    const menuElem: HTMLMenuElement = document.createElement('menu');
    menuElem.classList.add('task-list');

    return menuElem;
  }

  #addNewTask(evt: any): void {
    evt.preventDefault();

    const newTaskForm: HTMLFormElement = evt.target as HTMLFormElement;
    const newTaskInput: HTMLInputElement = newTaskForm.querySelector(
      `#${this.#NEW_TASK_INPUT_ID}`
    ) as HTMLInputElement;

    taskListVM.addTaskItem(newTaskInput.value);
    newTaskInput.value = '';
  }

  #createNewTaskInput(): HTMLInputElement {
    const newTaskInput: HTMLInputElement = document.createElement('input');
    newTaskInput.id = this.#NEW_TASK_INPUT_ID;
    newTaskInput.type = 'text';
    newTaskInput.placeholder = 'Add new todo';

    return newTaskInput;
  }

  #createNewTaskSubmit(): HTMLInputElement {
    const formSubmit: HTMLInputElement = document.createElement('input');
    formSubmit.classList.add('new-task-form');
    formSubmit.type = 'submit';
    formSubmit.value = 'Add new todo';

    return formSubmit;
  }

  #newTaskFormEventHandlers(evt: any): void {
    this.#addNewTask(evt);
    this.#updateTaskList();
  }

  #createNewTaskForm(): HTMLFormElement {
    const taskForm: HTMLFormElement = document.createElement('form');
    taskForm.action = '';
    taskForm.classList.add('new-task-form');

    const newTaskInput: HTMLInputElement = this.#createNewTaskInput();
    const formSubmit: HTMLInputElement = this.#createNewTaskSubmit();

    taskForm.append(newTaskInput, formSubmit);
    taskForm.addEventListener('submit', (evt: any): void =>
      this.#newTaskFormEventHandlers(evt)
    );

    return taskForm;
  }

  #deleteAllTasks(): void {
    taskListVM.deleteAllTaskItems();
  }

  #deleteAllTasksEventHandlers(): void {
    this.#deleteAllTasks();
    this.#updateTaskList();
  }

  #createDeleteAllTasksBtn(): HTMLButtonElement {
    const btnElem: HTMLButtonElement = document.createElement('button');
    btnElem.id = 'delete-all-tasks';
    btnElem.textContent = 'Delete all tasks';

    btnElem.addEventListener('click', (): void =>
      this.#deleteAllTasksEventHandlers()
    );

    return btnElem;
  }

  #showTaskListControls(): void {
    const controls: HTMLDivElement = document.createElement('div');
    const addNewTaskForm: HTMLFormElement = this.#createNewTaskForm();
    const deleteAllTasksBtn: HTMLButtonElement =
      this.#createDeleteAllTasksBtn();

    controls.append(addNewTaskForm, deleteAllTasksBtn);
    document.body.append(controls);
  }

  #displayMoreTasks(taskItemList: TaskItem[]): void {
    const newTasksToDisplay: TaskItem[] = taskItemList.filter(
      (task: TaskItem): boolean => !this.#displayedTaskIDs.includes(task.id)
    );

    const newTaskItemElems: Node[] = newTasksToDisplay.map(Task);

    this.#taskList.prepend(...newTaskItemElems);
  }

  #removeDisplayedTasks(taskItemList: TaskItem[]): void {
    // Find all displayed task IDs that are not present in storage
    const taskIDsToRemove: string[] = this.#displayedTaskIDs.filter(
      (id: string): boolean =>
        !taskItemList.some((task: TaskItem): boolean => task.id === id)
    );

    taskIDsToRemove.forEach((id: string): void => {
      document.querySelector(`[data-id='${id}']`)?.remove();
    });
  }

  #showTaskList(): void {
    document.body.append(this.#taskList);
  }

  #updateTaskList(): void {
    document.body.append(this.#taskList);

    const taskItemList: TaskItem[] = taskListVM.getTaskItems();
    const taskItemListLen: number = taskItemList.length;
    const displayedTaskListLen: number = this.#displayedTaskElems.length;

    if (taskItemListLen > displayedTaskListLen) {
      this.#displayMoreTasks(taskItemList);
    }

    if (taskItemListLen < displayedTaskListLen) {
      this.#removeDisplayedTasks(taskItemList);
    }
  }

  display(): void {
    this.#showTaskListControls();
    this.#showTaskList();
    this.#updateTaskList();
  }
}
