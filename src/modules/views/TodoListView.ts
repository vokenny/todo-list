import TodoItem from '../models/TodoItem';
import TodoListVM from '../view-models/TodoListViewModel';

export default class TodoListView {
  /*
  Used for taking the data returned from TodoListViewModel, and representing it on the browser.
  */

  #todoItemList: TodoListVM;

  constructor() {
    this.#todoItemList = new TodoListVM();
  }

  #createTodoListElement(todo: TodoItem): Node {
    const { task, creationDate } = todo;
    const todoElem: HTMLLIElement = document.createElement('li');
    todoElem.classList.add('todo');
    todoElem.textContent = `${creationDate}\t${task}`;

    return todoElem;
  }

  showTodoList(): void {
    const todoItemList: TodoItem[] = this.#todoItemList.getTodoItems();
    const menuElem: HTMLMenuElement = document.createElement('menu');
    const todoItems: Node[] = todoItemList.map(this.#createTodoListElement);

    menuElem.append(...todoItems);
    document.body.append(menuElem);
  }
}
