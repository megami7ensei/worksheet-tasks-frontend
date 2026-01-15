// src/App.tsx
import React from 'react';
import { Header } from './components/layout/Header';
import { Option } from './components/worksheet/Option';
import { useWorksheet } from './hooks/useWorksheet';

const App: React.FC = () => {
  const { tasks, loading, results, selections, submitAnswer } = useWorksheet();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#50c878]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="max-w-2xl mx-auto py-10 px-4">
        {tasks.map((task) => {
          const status = results[task.id] || 'idle';
          const selectedOption = selections[task.id];
          const isTaskDone = status !== 'idle';

          return (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
            >
              {/* Task Instruction */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {task.instruction}
              </h2>

              {/* Options List */}
              <div className="space-y-2">
                {task.options.map((opt) => (
                  <Option
                    key={opt.id}
                    text={opt.text}
                    isSelected={selectedOption === opt.id}
                    isDisabled={isTaskDone} // Disable interaction after answer
                    status={selectedOption === opt.id ? status : 'idle'}
                    onClick={() => submitAnswer(task.id, opt.id)}
                  />
                ))}
              </div>

              {/* Result Message Feedback */}
              {status === 'correct' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm font-medium animate-fade-in">
                  Correct! Well done.
                </div>
              )}
              {status === 'incorrect' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm font-medium animate-fade-in">
                  Incorrect. Please review the topic.
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default App;
