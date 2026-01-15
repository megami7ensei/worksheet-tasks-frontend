import { useState, useEffect } from 'react';

import { ensureSession } from '../api/session';
import { apiClient } from '../api/client';
import type { Task, SubmissionStatus } from './../types';

// Mock Data Fallback
const MOCK_TASKS: Task[] = [
  {
    id: '1',
    instruction: 'Select the correct HTML tag for the largest heading.',
    options: [
      { id: 'opt1', text: '<h6>' },
      { id: 'opt2', text: '<h1>' },
      { id: 'opt3', text: '<head>' },
    ],
  },
];

export const useWorksheet = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Track status per task: { [taskId]: 'correct' | 'incorrect' | 'idle' }
  const [results, setResults] = useState<Record<string, SubmissionStatus>>({});
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    const init = async () => {
      try {
        await ensureSession();
        // Try Fetching from API
        const res = await apiClient.get<Task[]>('/worksheet-tasks');
        setTasks(res.data);
      } catch (error) {
        console.warn('API Error, using fallback data', error);
        setTasks(MOCK_TASKS);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const submitAnswer = async (taskId: string, optionId: string) => {
    // Update local selection state immediately for UI responsiveness
    setSelections((prev) => ({ ...prev, [taskId]: optionId }));

    // Optimistic UI or wait for response? Let's wait for validation in this case.
    try {
      // const res = await apiClient.post(`/worksheet-tasks/${taskId}/answer`, { optionId });
      // const isCorrect = res.data.correct;

      // MOCK LOGIC (Frontend-only fallback)
      // Assume 'opt2' is always correct for demo purposes
      const isCorrect = optionId === 'opt2';

      setResults((prev) => ({
        ...prev,
        [taskId]: isCorrect ? 'correct' : 'incorrect',
      }));
    } catch (err) {
      console.error('Failed to submit answer', err);
    }
  };

  return { tasks, loading, results, selections, submitAnswer };
};
