export default interface Task {
  id: string;
  title: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;
}
