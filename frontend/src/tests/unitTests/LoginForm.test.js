import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LoginForm from '../../components/LoginForm';
import { authService } from '../../services/auth';

//mock the auth service
jest.mock('../../services/auth');

describe('LoginForm', () => {
  const mockOnLogin = jest.fn();
  const mockOnClose = jest.fn();

  //mock the auth service
  beforeEach(() => {
    jest.clearAllMocks();
    authService.login.mockResolvedValue({ 
      user: { email: 'test@example.com' } 
    });
  });

  //test the login form
  test('renders login form by default', () => {
    //render the login form
    render(<LoginForm onLogin={mockOnLogin} onClose={mockOnClose} />);
    //expect the login form to be in the document
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  
  //test the register form
  test('switches to register form when register link is clicked', () => {
    render(<LoginForm onLogin={mockOnLogin} onClose={mockOnClose} />);
    //fire the click event
    fireEvent.click(screen.getByText(/don't have an account\? register/i));
    //expect the register form to be in the document
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
  });

  //test the close button
  test('calls onClose when close button is clicked', () => {
    render(<LoginForm onLogin={mockOnLogin} onClose={mockOnClose} />);
    //fire the click event
    fireEvent.click(screen.getByRole('button', { name: /✕/i }));
    //expect the onClose function to have been called
    expect(mockOnClose).toHaveBeenCalled();
  });

  //test the login submission
  test('handles login submission', async () => {
    render(<LoginForm onLogin={mockOnLogin} onClose={mockOnClose} />);
    //fire the change event
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    //fire the submit event
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));
    });
    //expect the onLogin function to have been called
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'test@example.com' })
      );
    });
  });

  //test the login error
  test('handles login error', async () => {
    authService.login.mockRejectedValue(new Error('Invalid credentials'));
    //render the login form
    render(<LoginForm onLogin={mockOnLogin} onClose={mockOnClose} />);
    //fire the change event
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrong-password' }
    });
    //fire the submit event
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));
    });
    //expect the login error to be in the document
    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    //expect the onLogin function to not have been called
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});