import './task-card-style.css';
import Task from '../../interfaces/Task';
import { taskListVM } from '../../view-models/TaskListViewModel';

export function TaskCard({
  id,
  title,
  notes,
  isDone,
  creationDate,
  completedDate,
}: Task): Node {
  const taskCard: HTMLDivElement = document.createElement('div');
  taskCard.classList.add('task-card', 'glass');
  taskCard.dataset.id = id;
  if (isDone) taskCard.classList.add('completed');

  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.id = id;
  checkbox.checked = !!completedDate;

  // TODO: add taskListVM method to update single task upon checkbox state change
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

  const rule: HTMLHRElement = document.createElement('hr');

  const taskNotes: HTMLParagraphElement = document.createElement('p');
  taskNotes.classList.add('task-notes');
  taskNotes.textContent = notes;

  const completionDate: HTMLParagraphElement = document.createElement('p');
  if (completedDate) completionDate.textContent = `Completed: ${completedDate}`;

  const taskCardElems: HTMLSpanElement[] = [
    checkbox,
    taskHeading,
    notes ? rule : null,
    notes ? taskNotes : null,
    completedDate ? completionDate : null,
  ].filter((t) => t !== null) as HTMLSpanElement[];

  taskCard.append(...taskCardElems);
  return taskCard;
}
