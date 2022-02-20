import TaskItem from '../models/TaskItem';
import TaskListVM from '../view-models/TaskListViewModel';

export default class TaskListView {
  /*
  Used for taking the data returned from TaskListViewModel, and representing it on the browser.
  */

  #taskItemList: TaskListVM = new TaskListVM();

  #createTaskListElement(task: TaskItem): Node {
    const { description, creationDate } = task;
    const taskElem: HTMLLIElement = document.createElement('li');
    taskElem.classList.add('task');
    taskElem.textContent = `${creationDate}\t${description}`;

    return taskElem;
  }

  #deleteAllTasks(): void {
    this.#taskItemList.deleteAllTaskItems();
  }

  #createDeleteAllTasksBtn(): Node {
    const btnElem: HTMLButtonElement = document.createElement('button');
    btnElem.id = 'delete-all-tasks';
    btnElem.textContent = 'Delete all tasks';

    btnElem.addEventListener('click', () => this.#deleteAllTasks());

    return btnElem;
  }

  #showTaskListControls(): void {
    const controls: HTMLDivElement = document.createElement('div');
    const deleteAllTasksBtn: Node = this.#createDeleteAllTasksBtn();

    controls.append(deleteAllTasksBtn);
    document.body.append(controls);
  }

  #showTaslList(): void {
    const taskItemList: TaskItem[] = this.#taskItemList.getTaskItems();
    const menuElem: HTMLMenuElement = document.createElement('menu');
    const taskItems: Node[] = taskItemList.map(this.#createTaskListElement);

    menuElem.append(...taskItems);
    document.body.append(menuElem);
  }

  display(): void {
    this.#showTaskListControls();
    this.#showTaslList();
  }
}
