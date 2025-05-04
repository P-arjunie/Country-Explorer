import CountryCard from '../../components/CountryCard';
import { render, screen, fireEvent, act } from '@testing-library/react';

//test the country card component 
describe('CountryCard', () => {
  //mock the country
  const mockCountry = {
    flags: { png: 'test-flag.png' },
    name: { common: 'Test Country' },
    population: 1000000,
    region: 'Test Region',
    capital: ['Test Capital'],
    cca3: 'TST'
  };

  //mock the default props
  const defaultProps = {
    country: mockCountry,
    onCountrySelect: jest.fn(),
    isLoggedIn: false,
    onToggleFavorite: jest.fn(),
    isFavorite: false,
    onShowLogin: jest.fn()
  };

  test('renders country information correctly', () => {
    render(<CountryCard {...defaultProps} />);
    //expect the country information to be in the document
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText(/1,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    expect(screen.getByText(/Test Capital/)).toBeInTheDocument();
  });

  test('calls onShowLogin when favorite button clicked while not logged in', () => {
    render(<CountryCard {...defaultProps} />);
    //fire the click event
    const favoriteButton = screen.getByTitle('Login to add to favorites');
    fireEvent.click(favoriteButton);
    //expect the onShowLogin function to have been called
    expect(defaultProps.onShowLogin).toHaveBeenCalled();
    //expect the onToggleFavorite function to not have been called
    expect(defaultProps.onToggleFavorite).not.toHaveBeenCalled();
  });

  test('calls onToggleFavorite when favorite button clicked while logged in', async () => {
    render(<CountryCard {...defaultProps} isLoggedIn={true} />);
    //expect the favorite button to be in the document
    const favoriteButton = screen.getByTitle('Add to favorites');
    //fire the click event
    await act(async () => {
      fireEvent.click(favoriteButton);
    });
    //expect the onToggleFavorite function to have been called
    expect(defaultProps.onToggleFavorite).toHaveBeenCalledWith('TST');
  });

  // test('displays favorite icon in correct color when favorited', () => {
  //   const { rerender } = render(
  //     <CountryCard {...defaultProps} isLoggedIn={true} isFavorite={true} />
  //   );
  //   //expect the favorite button to be in the document
  //   const favoriteButton = screen.getByTitle('Add to favorites');
  //   //expect the favorite button to have the correct color
  //   expect(favoriteButton).toHaveClass('text-red-500');

  //   //test the unfavorited state
  //   rerender(
  //     <CountryCard {...defaultProps} isLoggedIn={true} isFavorite={false} />
  //   );
  //   expect(favoriteButton).toHaveClass('text-gray-400');
  // });
});