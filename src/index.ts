import './style.css';
import TaskListView from './modules/views/TaskListView/TaskListView';
import { taskListVM } from './modules/view-models/TaskListViewModel';

const taskListView: Node = TaskListView();
document.body.append(taskListView);
taskListVM.updateTaskList();
