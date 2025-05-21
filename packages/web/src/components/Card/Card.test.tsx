import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });
});
