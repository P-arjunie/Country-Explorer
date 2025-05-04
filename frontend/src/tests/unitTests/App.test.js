import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../../App';
import { setupFetchMock, mockCountryData } from '../testUtils';

//test the app component
beforeEach(() => {
  setupFetchMock();
});

//after each test
afterEach(() => {
  jest.clearAllMocks();
});

//test the initial state
test('renders initial state correctly', async () => {
  await act(async () => {
    render(<App />);
  });
  //expect the app to be in the document
  expect(screen.getByText('Where in the world?')).toBeInTheDocument();
  //expect the login link to be in the document
  expect(screen.getByText(/log in/i)).toBeInTheDocument();
  //expect the country to be in the document
  await waitFor(() => {
    expect(screen.getByText('India')).toBeInTheDocument();
  });
});

//test the login modal
test('shows login modal when clicking login link', async () => {
  await act(async () => {
    render(<App />);
  });
  //expect the login link to be in the document
  const loginLink = screen.getByText(/log in/i);
  //fire the click event
  fireEvent.click(loginLink);
  //expect the login modal to be in the document
  expect(screen.getByText('Sign In')).toBeInTheDocument();
  //expect the email address input to be in the document
  expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
  //expect the password input to be in the document
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
});

//test the country details
test('allows viewing country details without login', async () => {
  await act(async () => {
    render(<App />);
  });
  //expect the countries to be in the document
  await waitFor(() => {
    expect(screen.queryByText('Loading countries...')).not.toBeInTheDocument();
  });
  //click on the country card 
  const countryCard = screen.getByText('India').closest('div.cursor-pointer');
  fireEvent.click(countryCard);

  //mock the country details fetch
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([{
      name: { common: 'India' },
      flags: { svg: 'india-flag.svg' },
      population: 1000000,
      region: 'Asia',
      capital: ['New Delhi'],
      languages: { hin: 'Hindi', eng: 'English' },
      currencies: { INR: { name: 'Indian Rupee' } }
    }])
  });

  //expect the country details to be in the document
  await waitFor(() => {
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByText(/population:/i)).toBeInTheDocument();
  });
});