import './task-card-style.css';
import Task from '../../interfaces/Task';
import { taskListVM } from '../../view-models/TaskListViewModel';

export function TaskCard({
  id,
  title,
  isDone,
  creationDate,
  completedDate,
}: Task): Node {
  const taskCardElem: HTMLDivElement = document.createElement('div');
  taskCardElem.classList.add('task-card', 'glass');
  taskCardElem.dataset.id = id;
  if (isDone) taskCardElem.classList.add('completed');

  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.id = id;

  checkbox.addEventListener('change', (evt: Event): void => {
    const check: HTMLElement = evt.target as HTMLElement;
    taskListVM.toggleCompletedOnTask(check.id);
  });

  const label: HTMLLabelElement = document.createElement('label');
  label.textContent = title;
  label.setAttribute('for', id);

  const taskHeading: HTMLHeadingElement = document.createElement('h2');
  taskHeading.classList.add('task-title');
  taskHeading.append(label);

  taskCardElem.append(checkbox, taskHeading);
  return taskCardElem;
}
