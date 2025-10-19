/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Card Component', () => {
  const defaultProps = {
    title: 'Test Card Title',
    description: 'This is a test card description',
    imageUrl: 'https://example.com/test-image.jpg'
  };

  test('renders card with all props provided', () => {
    render(<Card {...defaultProps} />);
    
    const cardElement = screen.getByRole('img');
    const titleElement = screen.getByRole('heading', { level: 2 });
    const descriptionElement = screen.getByText(defaultProps.description);
    
    expect(cardElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders title correctly', () => {
    render(<Card {...defaultProps} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toHaveTextContent(defaultProps.title);
    expect(titleElement).toHaveAttribute('title', defaultProps.title);
  });

  test('renders description correctly', () => {
    render(<Card {...defaultProps} />);
    
    const descriptionElement = screen.getByText(defaultProps.description);
    expect(descriptionElement).toHaveTextContent(defaultProps.description);
    expect(descriptionElement).toHaveAttribute('title', defaultProps.description);
    expect(descriptionElement).toHaveClass('cardDescription');
  });

  test('renders image when imageUrl is provided', () => {
    render(<Card {...defaultProps} />);
    
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', defaultProps.imageUrl);
    expect(imageElement).toHaveAttribute('alt', defaultProps.title);
    expect(imageElement).toHaveClass('cardImage');
  });

  test('does not render image when imageUrl is not provided', () => {
    const propsWithoutImage = {
      title: 'Test Card',
      description: 'Test description'
    };
    
    render(<Card {...propsWithoutImage} />);
    
    const imageElement = screen.queryByRole('img');
    expect(imageElement).not.toBeInTheDocument();
  });

  test('does not render image when imageUrl is empty string', () => {
    const propsWithEmptyImage = {
      ...defaultProps,
      imageUrl: ''
    };
    
    render(<Card {...propsWithEmptyImage} />);
    
    const imageElement = screen.queryByRole('img');
    expect(imageElement).not.toBeInTheDocument();
  });

  test('does not render image when imageUrl is null', () => {
    const propsWithNullImage = {
      ...defaultProps,
      imageUrl: null
    };
    
    render(<Card {...propsWithNullImage} />);
    
    const imageElement = screen.queryByRole('img');
    expect(imageElement).not.toBeInTheDocument();
  });

  test('does not render image when imageUrl is undefined', () => {
    const propsWithUndefinedImage = {
      ...defaultProps,
      imageUrl: undefined
    };
    
    render(<Card {...propsWithUndefinedImage} />);
    
    const imageElement = screen.queryByRole('img');
    expect(imageElement).not.toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<Card {...defaultProps} />);
    
    const cardContainer = screen.getByRole('img').closest('div');
    const imageElement = screen.getByRole('img');
    const descriptionElement = screen.getByText(defaultProps.description);
    
    expect(cardContainer).toHaveClass('card');
    expect(imageElement).toHaveClass('cardImage');
    expect(descriptionElement).toHaveClass('cardDescription');
  });

  test('handles long title text', () => {
    const longTitle = 'This is a very long title that might be truncated or wrapped depending on the CSS styling applied to the card component';
    const propsWithLongTitle = {
      ...defaultProps,
      title: longTitle
    };
    
    render(<Card {...propsWithLongTitle} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toHaveTextContent(longTitle);
    expect(titleElement).toHaveAttribute('title', longTitle);
  });

  test('handles long description text', () => {
    const longDescription = 'This is a very long description that might be truncated or wrapped depending on the CSS styling applied to the card component. It should still render correctly and maintain accessibility.';
    const propsWithLongDescription = {
      ...defaultProps,
      description: longDescription
    };
    
    render(<Card {...propsWithLongDescription} />);
    
    const descriptionElement = screen.getByText(longDescription);
    expect(descriptionElement).toHaveTextContent(longDescription);
    expect(descriptionElement).toHaveAttribute('title', longDescription);
  });

  test('handles special characters in title and description', () => {
    const specialTitle = 'Title with "quotes" & <special> characters!';
    const specialDescription = 'Description with émojis 🎉 and ñ special chars';
    const propsWithSpecialChars = {
      ...defaultProps,
      title: specialTitle,
      description: specialDescription
    };
    
    render(<Card {...propsWithSpecialChars} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    const descriptionElement = screen.getByText(specialDescription);
    
    expect(titleElement).toHaveTextContent(specialTitle);
    expect(descriptionElement).toHaveTextContent(specialDescription);
  });

  test('handles empty title', () => {
    const propsWithEmptyTitle = {
      ...defaultProps,
      title: ''
    };
    
    render(<Card {...propsWithEmptyTitle} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toHaveTextContent('');
    expect(titleElement).toHaveAttribute('title', '');
  });

  test('handles empty description', () => {
    const propsWithEmptyDescription = {
      ...defaultProps,
      description: ''
    };
    
    render(<Card {...propsWithEmptyDescription} />);
    
    const descriptionElement = document.querySelector('.cardDescription');
    expect(descriptionElement).toHaveTextContent('');
    expect(descriptionElement).toHaveAttribute('title', '');
  });

  test('renders without any props', () => {
    render(<Card />);
    
    const cardContainer = document.querySelector('.card');
    const titleElement = screen.getByRole('heading', { level: 2 });
    const descriptionElement = document.querySelector('.cardDescription');
    const imageElement = screen.queryByRole('img');
    
    expect(cardContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(imageElement).not.toBeInTheDocument();
  });

  test('image alt text matches title', () => {
    render(<Card {...defaultProps} />);
    
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('alt', defaultProps.title);
  });

  test('image alt text is empty when title is empty', () => {
    const propsWithEmptyTitle = {
      ...defaultProps,
      title: ''
    };
    
    render(<Card {...propsWithEmptyTitle} />);
    
    const imageElement = document.querySelector('img');
    expect(imageElement).toHaveAttribute('alt', '');
  });

  test('card structure is semantically correct', () => {
    render(<Card {...defaultProps} />);
    
    // Check that heading comes after image (if present) and before description
    const cardContainer = document.querySelector('.card');
    const children = Array.from(cardContainer.children);
    
    const imageIndex = children.findIndex(child => child.tagName === 'IMG');
    const headingIndex = children.findIndex(child => child.tagName === 'H2');
    const paragraphIndex = children.findIndex(child => child.tagName === 'P');
    
    if (imageIndex !== -1) {
      expect(imageIndex).toBeLessThan(headingIndex);
    }
    expect(headingIndex).toBeLessThan(paragraphIndex);
  });

  test('handles numeric values in props', () => {
    const numericProps = {
      title: 123,
      description: 456.789,
      imageUrl: defaultProps.imageUrl
    };
    
    render(<Card {...numericProps} />);
    
    const titleElement = screen.getByRole('heading', { level: 2 });
    const descriptionElement = screen.getByText('456.789');
    
    expect(titleElement).toHaveTextContent('123');
    expect(descriptionElement).toHaveTextContent('456.789');
  });
});