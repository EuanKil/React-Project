import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the booking form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Customer Details' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Repair Details' })).toBeInTheDocument();
});
