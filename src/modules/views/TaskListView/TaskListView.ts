import TaskControls from '../../components/TaskControls/TaskControls.component';
import TaskList from '../../components/TaskList/TaskList.component';

export default function TaskListView(): Node {
  /*
  Bringing the components together, and representing it on the browser.
  */

  const main: HTMLElement = document.createElement('main');
  const taskControls: Node = TaskControls();
  const taskList: HTMLMenuElement = TaskList();

  main.append(taskControls, taskList);
  return main;
}
