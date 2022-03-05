import StorageService from '../services/StorageService';
import TaskItem from '../models/TaskItem';
import { taskListView } from '../views/TaskListView/TaskListView';

class TaskListViewModel {
  /*
  Performs CRUD operations on the TaskItems via StorageService.
  Triggers the Views to update.
  */

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
    taskListView.updateTaskList();
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
    taskListView.updateTaskList();
  }
}

export const taskListVM = new TaskListViewModel();
