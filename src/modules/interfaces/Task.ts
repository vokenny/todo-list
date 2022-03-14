export default interface Task {
  id: string;
  title: string;
  notes: string;
  isDone: boolean;
  dueDate?: string | undefined;
  priority?: string | undefined;
  completedDate?: string | undefined;
}
