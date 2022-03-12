import StorageService from '../services/StorageService';
import TaskItem from '../models/TaskItem';
import { taskListView } from '../views/TaskListView/TaskListView';
import NewTask from '../interfaces/NewTask';

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

  addTaskItem(newTask: NewTask): void {
    const newTaskItem: TaskItem = new TaskItem(newTask);
    const newTaskItemList: TaskItem[] = [newTaskItem, ...this.getTaskItems()];
    this.#storage.setItem(this.#TASK_LIST_KEY, JSON.stringify(newTaskItemList));
    taskListView.updateTaskList();
  }

  toggleCompletedOnTask(id: string): void {
    const updatedTaskItemList: TaskItem[] = this.getTaskItems().map((task) =>
      task.id === id
        ? {
            ...task,
            isDone: !task.isDone,
            completedDate: !task.isDone ? new Date().toDateString() : '', // Unintuitive, but it needs to be negated like isDone above it
          }
        : task
    );

    const updatedTask: TaskItem | undefined = updatedTaskItemList.find(
      (task: TaskItem): boolean => task.id === id
    );

    this.#storage.setItem(
      this.#TASK_LIST_KEY,
      JSON.stringify(updatedTaskItemList)
    );

    if (updatedTask) taskListView.updateSingleTask(updatedTask);
  }

  deleteTaskItem(id: string) {
    const updatedTaskItemList: TaskItem[] = this.getTaskItems().filter(
      (task) => task.id !== id
    );

    this.#storage.setItem(
      this.#TASK_LIST_KEY,
      JSON.stringify(updatedTaskItemList)
    );

    taskListView.updateTaskList();
  }

  deleteAllTaskItems(): void {
    this.#storage.removeItem(this.#TASK_LIST_KEY);
    taskListView.updateTaskList();
  }
}

export const taskListVM: TaskListViewModel = new TaskListViewModel();
