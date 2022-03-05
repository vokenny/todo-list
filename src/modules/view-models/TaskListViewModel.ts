import StorageService from '../services/StorageService';
import TaskItem from '../models/TaskItem';
import TaskList from '../components/TaskList/TaskList.component';
import Task from '../components/TaskItem/Task.component';

class TaskListViewModel {
  /*
  Performs CRUD operations on the TaskItems via StorageService.
  Updates the Views.
  */

  /* === CRUD operations via StorageService === */
  #storage: StorageService = new StorageService(localStorage);
  #TASK_LIST_KEY: string = 'taskItemList';

  getTaskItems(): TaskItem[] {
    const taskItemListData: string =
      this.#storage.getItem(this.#TASK_LIST_KEY) ?? '[]';

    const taskItemList: TaskItem[] = JSON.parse(taskItemListData);
    return taskItemList;
  }

  addTaskItem(task: string): void {
    const newTask: TaskItem = new TaskItem(task);
    const newTaskItemList: TaskItem[] = [newTask, ...this.getTaskItems()];
    this.#storage.setItem(this.#TASK_LIST_KEY, JSON.stringify(newTaskItemList));
  }

  toggleCompletedOnTask(id: string): void {
    const updatedTaskItemList: TaskItem[] = this.getTaskItems().map(
      (task: TaskItem): TaskItem =>
        task.id === id
          ? {
              ...task,
              isDone: !task.isDone,
              completedDate: !task.isDone ? new Date().toDateString() : '', // Unintuitive, but it needs to be negated like isDone above it
            }
          : task
    );
    this.#storage.setItem(
      this.#TASK_LIST_KEY,
      JSON.stringify(updatedTaskItemList)
    );
  }

  deleteAllTaskItems(): void {
    this.#storage.removeItem(this.#TASK_LIST_KEY);
  }

  /* === Updating the Views === */
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
      : TaskList();

    return menuElem;
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

  updateTaskList(): void {
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
}

export const taskListVM = new TaskListViewModel();
