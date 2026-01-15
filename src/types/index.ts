export interface Option {
  id: string;
  text: string;
}

export interface Task {
  id: string;
  instruction: string;
  options: Option[];
}

export interface TaskResult {
  taskId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId?: string; // optional: helpful for feedback
}

export type SubmissionStatus = 'idle' | 'correct' | 'incorrect';
