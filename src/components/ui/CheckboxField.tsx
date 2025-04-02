import React from 'react';

interface CheckboxFieldProps {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  description,
  required = false,
  checked,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={id}
          type="checkbox"
          required={required}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

export default CheckboxField;