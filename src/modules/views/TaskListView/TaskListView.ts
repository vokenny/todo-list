import './task-list-view-style.css';
import { TaskCard } from '../../components/TaskCard/TaskCard.component';
import TaskList from '../../components/TaskList/TaskList.component';
import TaskItem from '../../models/TaskItem';
import { taskListVM } from '../../view-models/TaskListViewModel';

class TaskListView {
  /*
  Updating the TaskListView on the browser.
  */

  get #displayedTaskElems(): HTMLElement[] {
    return Array.from(document.querySelectorAll('.task-card')) as HTMLElement[];
  }

  get #displayedTaskIDs(): string[] {
    return this.#displayedTaskElems.map(
      (task: HTMLElement): string => task.dataset.id ?? ''
    );
  }

  #getTaskList(): HTMLMenuElement {
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

    const newTaskItemElems: Node[] = newTasksToDisplay.map(TaskCard);

    this.#getTaskList().prepend(...newTaskItemElems);
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

export const taskListView: TaskListView = new TaskListView();
