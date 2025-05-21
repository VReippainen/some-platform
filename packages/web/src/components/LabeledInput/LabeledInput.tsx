import React from 'react';

export interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function LabeledInput(props: LabeledInputProps) {
  const { label, id, className = '', ...rest } = props;
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...rest}
        id={id}
        className={`relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm ${className}`}
      />
    </div>
  );
}
