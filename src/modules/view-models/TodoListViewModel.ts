import StorageService from '../services/StorageService';
import TodoItem from '../models/TodoItem';

export default class TodoListViewModel {
  /*
  Performs CRUD operations on the TodoItems via StorageService.
  */

  #storage: StorageService = new StorageService(localStorage);
  #TODO_LIST_KEY: string = 'todoItemList';

  getTodoItems(): TodoItem[] {
    const todoItemListData: string =
      this.#storage.getItem('todoItemList') ?? '[]';

    const todoItemList: TodoItem[] = JSON.parse(todoItemListData);
    return todoItemList;
  }

  addTodoItem(task: string): void {
    const newTodo: TodoItem = new TodoItem(task);
    const newTodoItemList: TodoItem[] = [...this.getTodoItems(), newTodo];
    this.#storage.setItem(this.#TODO_LIST_KEY, JSON.stringify(newTodoItemList));
  }

  deleteAllTodoItems(): void {
    this.#storage.removeItem(this.#TODO_LIST_KEY);
  }
}
