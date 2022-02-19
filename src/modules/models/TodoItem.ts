import Todo from '../interfaces/Todo';
import uuidv4 from '../services/UUIDService';

export default class TodoItem implements Todo {
  /*
  This class is used for creating new TodoItems.
  It implements the Todo interface, so:
    1. it highlights type-safety to check we have all the required properties
    2. we have intellisense support for doing read/update operations on the TodoItems
  */

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
