/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders button with icon only', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(<Button icon={<TestIcon />} />);

    const buttonElement = screen.getByRole('button');
    const iconElement = screen.getByTestId('test-icon');

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  test('renders button with both icon and text', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(<Button icon={<TestIcon />}>Search</Button>);

    const buttonElement = screen.getByRole('button');
    const iconElement = screen.getByTestId('test-icon');
    const textElement = screen.getByText('Search');

    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('passes event object to onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  test('applies custom className through props spread', () => {
    render(<Button className="custom-class">Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  test('is enabled when disabled prop is false', () => {
    render(<Button disabled={false}>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeDisabled();
  });

  test('is enabled by default when disabled prop is not provided', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeDisabled();
  });

  test('applies correct button type through props spread', () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('defaults to button type when type is not specified', () => {
    render(<Button>Default Button</Button>);
    const buttonElement = screen.getByRole('button');
    // HTML buttons don't have a type attribute by default unless explicitly set
    expect(buttonElement).not.toHaveAttribute('type');
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies additional props through spread operator', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom button">
        Click me
      </Button>
    );
    const buttonElement = screen.getByTestId('custom-button');

    expect(buttonElement).toHaveAttribute('aria-label', 'Custom button');
  });

  test('applies icon CSS class when icon is provided', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(<Button icon={<TestIcon />}>Search</Button>);

    const iconSpan = screen.getByTestId('test-icon').parentElement;
    expect(iconSpan).toHaveClass('btn__icon');
  });

  test('applies text CSS class when children are provided', () => {
    render(<Button>Click me</Button>);
    const textSpan = screen.getByText('Click me');
    expect(textSpan).toHaveClass('btn__text');
  });

  test('does not render icon span when icon is not provided', () => {
    render(<Button>Just text</Button>);
    const buttonElement = screen.getByRole('button');
    const iconSpan = buttonElement.querySelector('.btn__icon');
    expect(iconSpan).toBeNull();
  });

  test('does not render text span when children are not provided', () => {
    const TestIcon = () => <span data-testid="test-icon">🔍</span>;
    render(<Button icon={<TestIcon />} />);
    const buttonElement = screen.getByRole('button');
    const textSpan = buttonElement.querySelector('.btn__text');
    expect(textSpan).toBeNull();
  });

  test('handles multiple clicks correctly', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  test('renders complex icon components correctly', () => {
    const ComplexIcon = ({ size }) => (
      <svg data-testid="complex-icon" width={size} height={size}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    );

    render(<Button icon={<ComplexIcon size={24} />}>Complex Icon</Button>);

    const iconElement = screen.getByTestId('complex-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('width', '24');
  });

  test('handles button focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <Button onFocus={handleFocus} onBlur={handleBlur}>
        Focusable Button
      </Button>
    );

    const buttonElement = screen.getByRole('button');

    fireEvent.focus(buttonElement);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(buttonElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('supports keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<Button onKeyDown={handleKeyDown}>Keyboard Button</Button>);

    const buttonElement = screen.getByRole('button');
    fireEvent.keyDown(buttonElement, { key: 'Enter', code: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
