import { useState, useEffect } from 'react';

import { ensureSession } from './../api/session';
import { apiClient } from './../api/client';
import type { Task, SubmissionStatus } from './../types';

export const useWorksheet = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, SubmissionStatus>>({});
  const [selections, setSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        await ensureSession();

        const res = await apiClient.get<Task[]>('/worksheet-tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to load worksheet:', err);
        setError('Unable to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const submitAnswer = async (taskId: string, optionId: string) => {
    // update local selection state immediately for UI responsiveness
    setSelections((prev) => ({ ...prev, [taskId]: optionId }));

    try {
      const response = await apiClient.post<{ correct: boolean }>(
        `/worksheet-tasks/${taskId}/answer`,
        { optionId }
      );

      const isCorrect = response.data.correct;

      setResults((prev) => ({
        ...prev,
        [taskId]: isCorrect ? 'correct' : 'incorrect',
      }));
    } catch (err) {
      console.error(`Failed to submit answer for task ${taskId}`, err);
    }
  };

  return { tasks, loading, error, results, selections, submitAnswer };
};
