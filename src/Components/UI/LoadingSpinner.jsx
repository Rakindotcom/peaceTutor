const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent`}
        role="status"
        aria-label={message}
      >
        <span className="sr-only">{message}</span>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;