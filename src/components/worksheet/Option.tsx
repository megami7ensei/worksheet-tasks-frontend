import React from 'react';

interface OptionProps {
  text: string;
  isSelected: boolean;
  isDisabled: boolean;
  status: 'idle' | 'correct' | 'incorrect';
  onClick: () => void;
}

export const Option: React.FC<OptionProps> = ({
  text,
  isSelected,
  isDisabled,
  status,
  onClick,
}) => {
  // Dynamic class logic
  const baseClasses =
    'w-full p-4 mb-3 text-left rounded-lg border-2 transition-all duration-200 font-medium';

  let stateClasses =
    'border-gray-200 bg-white hover:border-[#50c878] hover:bg-gray-50 text-gray-700';

  if (isSelected && status === 'idle') {
    stateClasses = 'border-[#50c878] bg-[#99e999]/20 text-[#2e7d4b]';
  } else if (status === 'correct') {
    stateClasses = 'border-green-600 bg-green-100 text-green-800';
  } else if (status === 'incorrect') {
    stateClasses = isSelected
      ? 'border-red-500 bg-red-50 text-red-700'
      : 'border-gray-200 bg-gray-100 text-gray-400'; // dim others
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${stateClasses} ${
        isDisabled ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {/* Optional Icon Feedback */}
        {status === 'correct' && <span>✓</span>}
        {status === 'incorrect' && isSelected && <span>✕</span>}
      </div>
    </button>
  );
};
