import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LabeledInput, type LabeledInputProps } from './LabeledInput';
import { describe, it, expect, vi } from 'vitest';

describe('LabeledInput', () => {
  const defaultProps: LabeledInputProps = {
    label: 'Test Label',
    id: 'test-input',
    value: '',
    onChange: vi.fn(),
    placeholder: 'Enter text',
    required: true,
    type: 'text',
  };

  it('renders label and input', () => {
    render(<LabeledInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    const label = screen.getByLabelText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<LabeledInput {...defaultProps} onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports type="text" by default', () => {
    render(<LabeledInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('supports custom className', () => {
    render(<LabeledInput {...defaultProps} className="custom-class" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('custom-class');
  });
});
