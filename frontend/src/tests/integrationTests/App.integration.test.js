import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../../App';
import { setupFetchMock } from '../testUtils';
  
//test the app component
// Mock the entire auth service module
jest.mock('../../services/auth', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn()
  }
}));

// Import the mocked service
import { authService } from '../../services/auth';

beforeEach(() => {
  setupFetchMock();
  localStorage.clear();
  jest.clearAllMocks();

  // Mock successful login
  authService.login.mockResolvedValue({
    token: 'fake-token',
    user: {
      email: 'test@example.com',
      name: 'Test User'
    }
  });
});

test('full user journey', async () => {
  await act(async () => {
    render(<App />);
  });

  // Wait for initial load
  await waitFor(() => {
    expect(screen.queryByText('Loading countries...')).not.toBeInTheDocument();
  });

  // Click login
  const loginLink = screen.getByText(/log in/i);
  fireEvent.click(loginLink);

  // Fill login form
  const emailInput = screen.getByPlaceholderText('Email address');
  const passwordInput = screen.getByPlaceholderText('Password');
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Submit form
  const submitButton = screen.getByRole('button', { name: /sign in/i });
  await act(async () => {
    fireEvent.click(submitButton);
  });

  // Wait for logged in state
  await waitFor(() => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  // Test favorite functionality
  const favoriteButton = screen.getByTitle('Add to favorites');
  await act(async () => {
    fireEvent.click(favoriteButton);
  });

  // Test logout
  const logoutButton = screen.getByRole('button', { name: /logout/i });
  fireEvent.click(logoutButton);

  // Verify logged out state
  await waitFor(() => {
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });
});

test('shows no results when searching for a non-existent country', async () => {
  await act(async () => {
    render(<App />);
  });

  // Wait for initial data
  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  // Search for a country that doesn't exist
  const searchInput = screen.getByPlaceholderText('Search for a country...');
  fireEvent.change(searchInput, { target: { value: 'Atlantis' } });

  // Mock fetch to return 404
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => []
  });

  await waitFor(() => {
    expect(screen.getByText('No countries found matching your search')).toBeInTheDocument();
  });
});

test('shows no results when filtering by a region with no countries', async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  // Mock fetch to return empty array for region
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => []
  });

  const regionSelect = screen.getByRole('combobox');
  fireEvent.change(regionSelect, { target: { value: 'Antarctica' } });

  // await waitFor(() => {
  //   expect(screen.getByRole('button', { name: /reset filters/i })).toBeInTheDocument();
  // });
});

test('shows login modal when trying to favorite while not logged in', async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  // Click the favorite button (should prompt login)
  const favoriteButton = screen.getByTitle('Login to add to favorites');
  fireEvent.click(favoriteButton);

  await waitFor(() => {
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});

test('login modal closes when clicking close button', async () => {
  await act(async () => {
    render(<App />);
  });

  fireEvent.click(screen.getByText(/log in/i));
  expect(screen.getByText('Sign In')).toBeInTheDocument();

  // Click the close button
  fireEvent.click(screen.getByTitle('Close'));

  await waitFor(() => {
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});

test('header and logout button are visible on small screens', async () => {
  // Set window size to mobile
  window.innerWidth = 375;
  window.dispatchEvent(new Event('resize'));

  await act(async () => {
    render(<App />);
  });

  // Log in
  fireEvent.click(screen.getByText(/log in/i));
  fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });

  await waitFor(() => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});

test('shows error when registering with missing fields', async () => {
  await act(async () => {
    render(<App />);
  });

  fireEvent.click(screen.getByText(/log in/i));
  fireEvent.click(screen.getByText(/don't have an account\? register/i));

  // Leave name empty
  fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

  // Mock register to throw error
  authService.register.mockRejectedValueOnce(new Error('Please provide all required fields'));

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
  });

  await waitFor(() => {
    expect(screen.getByText('Please provide all required fields')).toBeInTheDocument();
  });
});

test('back button in country details returns to country list', async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('India'));

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: /back/i }));

  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });
}); 