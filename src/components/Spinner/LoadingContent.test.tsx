import React from 'react';

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { LoadingContent } from './LoadingContent';

describe('Loading', () => {
  it('should render with default title', () => {
    // when
    render(<LoadingContent />);

    // then
    const linkElement = screen.getByText(/^Loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});
