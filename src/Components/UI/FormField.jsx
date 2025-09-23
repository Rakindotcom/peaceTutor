const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  options,
  isTextarea = false,
  error,
  pattern,
  min,
  max,
  disabled = false
}) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="block mb-1 font-semibold">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full border rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          required={required}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options}
        </select>
      ) : isTextarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg p-3 mb-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
            }`}
          required={required}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'
            }`}
          required={required}
          pattern={pattern}
          min={min}
          max={max}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
      )}

      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;