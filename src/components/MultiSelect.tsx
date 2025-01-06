import React from 'react';
import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const selectOptions: Option[] = options.map(opt => ({
    value: opt,
    label: opt,
  }));

  const selectedValues = value.map(v => ({
    value: v,
    label: v,
  }));

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map(v => v.value));
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <Select
        isMulti
        options={selectOptions}
        value={selectedValues}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={`Select ${label}...`}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#3b82f6',
            primary75: '#60a5fa',
            primary50: '#93c5fd',
            primary25: '#dbeafe',
          },
        })}
      />
    </div>
  );
};