import './style.css';
import TaskControls from './modules/components/TaskControls/TaskControls.component';
import TaskList from './modules/components/TaskList/TaskList.component';
import { taskListView } from './modules/views/TaskListView/TaskListView';

/* === Initial view === */

const main: HTMLElement = document.createElement('main');
const taskControls: Node = TaskControls();
const taskList: HTMLMenuElement = TaskList();

main.append(taskControls, taskList);
document.body.append(main);
taskListView.updateTaskList();
