import './task-card-style.css';
import Task from '../../interfaces/Task';
import { taskListVM } from '../../view-models/TaskListViewModel';

export function TaskCard({
  id,
  title,
  notes,
  isDone,
  dueDate,
  priority,
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

  const deleteAnchor: HTMLAnchorElement = document.createElement('a');
  deleteAnchor.classList.add('delete-task', 'spin');

  deleteAnchor.addEventListener('click', (evt): void => {
    const close: HTMLElement = evt.target as HTMLElement;
    const taskId = close.parentElement?.getAttribute('data-id');
    if (taskId) taskListVM.deleteTaskItem(taskId);
  });

  const dueDateSubtitle: HTMLSpanElement = document.createElement('span');
  if (dueDate && dueDateSubtitle) {
    dueDateSubtitle.classList.add('task-due-date');
    dueDateSubtitle.textContent = `Due: ${dueDate}`;
  }

  const priorityBadge: HTMLSpanElement = document.createElement('span');
  priorityBadge.classList.add('task-badge');
  if (priority) {
    priorityBadge.classList.add(priority);
    priorityBadge.textContent =
      priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  const rule: HTMLHRElement = document.createElement('hr');

  const taskNotes: HTMLParagraphElement = document.createElement('p');
  taskNotes.classList.add('task-notes');
  taskNotes.textContent = notes;

  const completionDate: HTMLParagraphElement = document.createElement('p');
  completionDate.classList.add('completed-date');
  if (completedDate) completionDate.textContent = `Completed: ${completedDate}`;

  const taskCardElems: HTMLElement[] = [
    checkbox,
    taskHeading,
    deleteAnchor,
    priority ? priorityBadge : null,
    dueDate ? dueDateSubtitle : null,
    notes ? rule : null,
    notes ? taskNotes : null,
    completedDate ? completionDate : null,
  ].filter((elem) => elem !== null) as HTMLElement[];

  taskCard.append(...taskCardElems);
  return taskCard;
}
