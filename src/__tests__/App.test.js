import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Ensure this import is present
import App from '../App';

describe('Newsletter Signup Form', () => {
  test('renders form elements', () => {
    render(<App />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  });

  test('submits form and shows thank you message', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByLabelText(/coding/i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you, john doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/interests: coding/i)).toBeInTheDocument();
  });

  test('shows no interests if none selected', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you, jane doe!/i)).toBeInTheDocument();
    expect(screen.queryByText(/interests:/i)).not.toBeInTheDocument();
  });
});
