export default function TaskList(): HTMLMenuElement {
  const menuElem: HTMLMenuElement = document.createElement('menu');
  menuElem.classList.add('task-list');

  return menuElem;
}
