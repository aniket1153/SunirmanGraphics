import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ title, onClose, children, width = "max-w-md" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className={`w-full ${width} bg-white rounded-lg shadow-xl border border-hairline`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-ink transition-colors"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
