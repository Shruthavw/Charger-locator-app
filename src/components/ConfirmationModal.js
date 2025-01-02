import React from "react";

const ConfirmationModal = ({handleCancel, handleConfirm}) => {
    return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-blue-950 font-serif">
                  Confirm Update
                </h2>
                <p className="text-black font-semibold">
                  Are you sure you want to update the location?
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-blue-950 text-white font-semibold rounded hover:bg-blue-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-2 bg-blue-950 text-white font-semibold rounded hover:bg-blue-900"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
        
    );
};

export default ConfirmationModal;