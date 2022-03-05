import StorageService from '../services/StorageService';
import TaskItem from '../models/TaskItem';

export default class TaskListViewModel {
  /*
  Performs CRUD operations on the TaskItems via StorageService.
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
  }

  deleteAllTaskItems(): void {
    this.#storage.removeItem(this.#TASK_LIST_KEY);
  }
}
