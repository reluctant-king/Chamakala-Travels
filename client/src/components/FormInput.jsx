import React from 'react';

/**
 * Reusable input component with label and optional error message.
 * Supports text, email, password, number, date, etc.
 */
const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={name}>
          {label}{required && ' *'}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-brand-gold transition-colors"
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FormInput;
