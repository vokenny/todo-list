export default interface Task {
  id: string;
  description: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;
}
