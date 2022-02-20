import Task from '../interfaces/Task';
import uuidv4 from '../services/UUIDService';

export default class TaskItem implements Task {
  /*
  This class is used for creating new TaskItems.
  It implements the Task interface, so:
    1. it highlights type-safety to check we have all the required properties
    2. we have intellisense support for doing read/update operations on the TaskItems
  */

  id: string;
  description: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;

  constructor(task: string) {
    this.id = uuidv4();
    this.description = task;
    this.isDone = false;
    this.creationDate = new Date().toDateString();
  }
}
