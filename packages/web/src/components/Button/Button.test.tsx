import { render } from '@testing-library/react';
import Button from './Button';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Test</Button>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom">Content</Button>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports primary variant', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-gray-800');
  });

  it('supports secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('bg-gray-600');
  });

  it('supports text variant', () => {
    const { container } = render(<Button variant="text">Text</Button>);
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('supports icon variant', () => {
    const { container } = render(<Button variant="icon">I</Button>);
    expect(container.firstChild).toHaveClass('p-2');
  });
});
