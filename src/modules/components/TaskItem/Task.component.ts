import TaskItem from '../../models/TaskItem';
import { taskListVM } from '../../view-models/TaskListViewModel';

export default function Task(task: TaskItem): Node {
  const { id, description, creationDate } = task;
  const taskElem: HTMLLIElement = document.createElement('li');
  taskElem.classList.add('task');
  taskElem.dataset.id = id;

  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;

  checkbox.addEventListener('change', (evt: Event): void => {
    const check: HTMLElement = evt.target as HTMLElement;
    taskListVM.toggleCompletedOnTask(check.id);
  });

  const label: HTMLLabelElement = document.createElement('label');
  label.textContent = `${creationDate}\t${description}`;
  label.setAttribute('for', id);

  taskElem.append(checkbox, label);
  return taskElem;
}
