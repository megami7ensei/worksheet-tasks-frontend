import React from 'react';
import { Header } from './components/layout/Header';
import { Option } from './components/worksheet/Option';
import { useWorksheet } from './hooks/useWorksheet';

const App: React.FC = () => {
  const { tasks, loading, error, results, selections, submitAnswer } =
    useWorksheet();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#50c878]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center">
          <p className="text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Header />
        <div className="flex justify-center items-center h-[80vh] text-gray-500">
          No tasks available at the moment.
        </div>
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
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 transition-shadow hover:shadow-md"
            >
              {/* Task Instruction */}
              <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {task.instruction}
              </h2>

              {/* Options List */}
              <div className="space-y-3">
                {task.options.map((opt) => (
                  <Option
                    key={opt.id}
                    text={opt.text}
                    isSelected={selectedOption === opt.id}
                    isDisabled={isTaskDone}
                    status={selectedOption === opt.id ? status : 'idle'}
                    onClick={() => submitAnswer(task.id, opt.id)}
                  />
                ))}
              </div>

              {/* Result Message Feedback */}
              {status === 'correct' && (
                <div
                  role="alert"
                  className="mt-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm font-medium animate-fade-in"
                >
                  Correct! Well done.
                </div>
              )}
              {status === 'incorrect' && (
                <div
                  role="alert"
                  className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm font-medium animate-fade-in"
                >
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
