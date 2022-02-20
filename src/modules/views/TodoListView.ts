import TodoItem from '../models/TodoItem';
import TodoListVM from '../view-models/TodoListViewModel';

export default class TodoListView {
  /*
  Used for taking the data returned from TodoListViewModel, and representing it on the browser.
  */

  #todoItemList: TodoListVM = new TodoListVM();

  #createTodoListElement(todo: TodoItem): Node {
    const { task, creationDate } = todo;
    const todoElem: HTMLLIElement = document.createElement('li');
    todoElem.classList.add('todo');
    todoElem.textContent = `${creationDate}\t${task}`;

    return todoElem;
  }

  #deleteAllTodos(): void {
    this.#todoItemList.deleteAllTodoItems();
  }

  #createDeleteAllTodosBtn(): Node {
    const btnElem: HTMLButtonElement = document.createElement('button');
    btnElem.id = 'clear-todos';
    btnElem.textContent = 'Delete all todos';

    btnElem.addEventListener('click', () => this.#deleteAllTodos());

    return btnElem;
  }

  #showTodoListControls(): void {
    const controls: HTMLDivElement = document.createElement('div');
    const deleteAllTodosBtn: Node = this.#createDeleteAllTodosBtn();

    controls.append(deleteAllTodosBtn);
    document.body.append(controls);
  }

  #showTodoList(): void {
    const todoItemList: TodoItem[] = this.#todoItemList.getTodoItems();
    const menuElem: HTMLMenuElement = document.createElement('menu');
    const todoItems: Node[] = todoItemList.map(this.#createTodoListElement);

    menuElem.append(...todoItems);
    document.body.append(menuElem);
  }

  display(): void {
    this.#showTodoListControls();
    this.#showTodoList();
  }
}
