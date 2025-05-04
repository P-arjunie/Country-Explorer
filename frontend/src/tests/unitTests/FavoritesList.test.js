import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesList from '../../components/FavoritesList';

//test the favorites list
describe('FavoritesList', () => {
  const mockCountries = [
    {
      flags: { png: 'flag1.png' },
      name: { common: 'Country 1' },
      region: 'Region 1',
      cca3: 'CN1'
    },
    {
      flags: { png: 'flag2.png' },
      name: { common: 'Country 2' },
      region: 'Region 2',
      cca3: 'CN2'
    }
  ];

  //mock the default props    
  const defaultProps = {
    countries: mockCountries,
    favorites: ['CN1'],
    onCountrySelect: jest.fn(),
    onClose: jest.fn()
  };

  //test the favorites list
  test('renders only favorite countries', () => {
    render(<FavoritesList {...defaultProps} />);
    //expect the favorite countries to be in the document
    expect(screen.getByText('Country 1')).toBeInTheDocument();
    //expect the non-favorite country to not be in the document
    expect(screen.queryByText('Country 2')).not.toBeInTheDocument();
  });

  test('displays empty message when no favorites', () => {
    render(<FavoritesList {...defaultProps} favorites={[]} />);
    //expect the empty message to be in the document
    expect(screen.getByText('No favorite countries yet')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<FavoritesList {...defaultProps} />);
    //fire the click event
    fireEvent.click(screen.getByRole('button', { name: /✕/i }));
    //expect the onClose function to have been called
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  test('calls onCountrySelect and onClose when a country is clicked', () => {
    render(<FavoritesList {...defaultProps} />);
    //fire the click event
    fireEvent.click(screen.getByText('Country 1'));
    //expect the onCountrySelect function to have been called
    expect(defaultProps.onCountrySelect).toHaveBeenCalledWith('CN1');
    //expect the onClose function to have been called
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
