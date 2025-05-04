import CountryDetail from '../../components/CountryDetail';
import { render, screen } from '@testing-library/react';

//test the country detail component
test('renders country details with fallback values', () => {
  //mock the country
  const country = {
    name: { common: 'India', nativeName: { hin: { common: 'भारत' } } },
    population: 1000000,
    region: 'Asia',
    subregion: 'Southern Asia',
    capital: ['New Delhi'],
    tld: ['.in'],
    currencies: { INR: { name: 'Indian Rupee' } },
    languages: { hin: 'Hindi', eng: 'English' },
    flags: { svg: 'https://flagcdn.com/in.svg' },
    borders: [],
  };

  //render the country detail component
  render(<CountryDetail country={country} onBack={() => {}} />);
  //expect the country details to be in the document
  expect(screen.getByRole('heading', { name: /India/i })).toBeInTheDocument();
  expect(screen.getByText(/Indian Rupee/i)).toBeInTheDocument();
  expect(screen.getByText(/Hindi, English/i)).toBeInTheDocument();
});

