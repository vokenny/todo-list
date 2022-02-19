import StorageService from '../services/StorageService';
import { TodoItem } from './TodoItem';

export class TodoList {
  #storage: StorageService;

  constructor() {
    this.#storage = new StorageService(localStorage);
  }

  getTodoItems(): TodoItem[] {
    const todoItemListData: string =
      this.#storage.getItem('todoItemList') ?? '[]';

    const todoItemList: TodoItem[] = JSON.parse(todoItemListData);
    return todoItemList;
  }

  addTodoItem(task: string): void {
    const newTodo: TodoItem = new TodoItem(task);
    const newTodoItemList: TodoItem[] = [...this.getTodoItems(), newTodo];
    this.#storage.setItem('todoItemList', JSON.stringify(newTodoItemList));
  }
}
