import React from 'react';

type ResultNotReadyModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

const TestResultPendingModal: React.FC<ResultNotReadyModalProps> = ({ isOpen, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-2">Result Not Ready</h2>
        <p className="text-sm text-gray-700 mb-4">
          The test result is not yet available. Please check back later.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResultPendingModal;
