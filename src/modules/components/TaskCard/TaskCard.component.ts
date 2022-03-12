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
  if (isDone) taskCard.classList.add('done');

  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.id = id;
  checkbox.checked = !!completedDate;

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

  const deleteAnchor = document.createElement('a');
  deleteAnchor.classList.add('delete-task', 'spin');

  deleteAnchor.addEventListener('click', (evt): void => {
    const close: HTMLElement = evt.target as HTMLElement;
    const taskId = close.parentElement?.getAttribute('data-id');
    if (taskId) taskListVM.deleteTaskItem(taskId);
  });

  // TODO: Add a due date, and remove creation date

  const rule: HTMLHRElement = document.createElement('hr');

  const taskNotes: HTMLParagraphElement = document.createElement('p');
  taskNotes.classList.add('task-notes');
  taskNotes.textContent = notes;

  const completionDate: HTMLParagraphElement = document.createElement('p');
  completionDate.classList.add('completed-date');
  if (completedDate) completionDate.textContent = `Completed: ${completedDate}`;

  const taskCardElems: HTMLSpanElement[] = [
    checkbox,
    taskHeading,
    deleteAnchor,
    notes ? rule : null,
    notes ? taskNotes : null,
    completedDate ? completionDate : null,
  ].filter((elem) => elem !== null) as HTMLSpanElement[];

  taskCard.append(...taskCardElems);
  return taskCard;
}
