import CountryList from '../../components/CountryList';
import { render, screen } from '@testing-library/react';

//test the country list component
describe('CountryList', () => {
  //mock the countries
  const mockCountries = [
    {
      flags: { png: 'flag1.png' },
      name: { common: 'Country 1' },
      population: 1000000,
      region: 'Region 1',
      capital: ['Capital 1'],
      cca3: 'CN1'
    },
    {
      flags: { png: 'flag2.png' },
      name: { common: 'Country 2' },
      population: 2000000,
      region: 'Region 2',
      capital: ['Capital 2'],
      cca3: 'CN2'
    }
  ];

  //mock the default props
  const defaultProps = {
    countries: mockCountries,
    onCountrySelect: jest.fn(),
    isLoggedIn: false,
    favorites: [],
    onToggleFavorite: jest.fn(),
    onShowLogin: jest.fn()
  };

  test('renders all countries', () => {
    render(<CountryList {...defaultProps} />);
    //expect the countries to be in the document    
    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Country 2')).toBeInTheDocument();
  });

  //test the favorite status
  test('renders favorite status correctly', () => {
    render(
      <CountryList 
        {...defaultProps} 
        isLoggedIn={true} 
        favorites={['CN1']} 
      />
    );
    // The first country is a favorite, so its button should have title "Remove from favorites"
    const removeButton = screen.getByTitle('Remove from favorites');
    expect(removeButton).toHaveClass('text-red-500');
    // The second country is not a favorite, so its button should have title "Add to favorites"
    const addButton = screen.getByTitle('Add to favorites');
    expect(addButton).toHaveClass('text-gray-400');
  });
});