export default interface Todo {
  id: string;
  task: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;
}
