import React from 'react';
import { cleanup, fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Counter from './Counter';

afterEach(cleanup);

it('should equal to 0', () => {
 render(<Counter/>);
  

  expect(screen.getByTestId('counter')).toHaveTextContent('0');
})

it('should be enabled', () => {
  render(<Counter/>);

  expect(screen.getByTestId('increment')).not.toHaveAttribute('disabled');
})

it('should be disabled', () => {
  render(<Counter/>);

  expect(screen.getByTestId('decrement')).toBeDisabled();
})

it('should increment counter', () => {
  render(<Counter/>);

  fireEvent.click(screen.getByTestId('increment'));

  expect(screen.getByTestId('counter')).toHaveTextContent('1');
})

it('should decrement counter', () => {
  render(<Counter/>);

  fireEvent.click(screen.getByTestId('decrement'));

  expect(screen.getByTestId('counter')).toHaveTextContent('0');
})