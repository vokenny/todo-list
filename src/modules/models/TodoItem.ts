import Todo from '../interfaces/Todo';
import uuidv4 from '../services/UUIDService';

export class TodoItem implements Todo {
  id: string;
  task: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;

  constructor(task: string) {
    this.id = uuidv4();
    this.task = task;
    this.isDone = false;
    this.creationDate = new Date().toDateString();
  }
}

