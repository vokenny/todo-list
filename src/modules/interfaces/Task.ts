export default interface Task {
  id: string;
  title: string;
  notes: string;
  isDone: boolean;
  creationDate: string;
  completedDate?: string | undefined;
}
