import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, message, status = 'info', children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleFocusTrap = (e) => {
      if (!modalRef.current || !isOpen) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('keydown', handleFocusTrap);
      document.querySelector('.modal-close-button')?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-2 border-green-500 text-green-600';
      case 'error':
        return 'border-2 border-red-500 text-red-600';
      case 'warning':
        return 'border-2 border-yellow-500 text-yellow-600';
      default:
        return 'border-2 border-blue-500 text-blue-600';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      ref={modalRef} 
      role="dialog" 
      aria-modal="true"
      aria-live="assertive"
    >
      <div className={`bg-white rounded-lg p-6 max-w-md w-full shadow-xl ${getStatusStyles()}`}>
        <h2 className={`text-xl font-bold mb-4 ${status === 'error' ? 'text-red-600' : status === 'success' ? 'text-green-600' : 'text-blue-600'}`}>
          {title || (status === 'success' ? 'Success' : status === 'error' ? 'Error' : 'Information')}
        </h2>
        {message && <p className="text-gray-700 mb-6">{message}</p>}
        {children}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="modal-close-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;